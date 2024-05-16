const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const { promisify } = require('util');
const bcrypt = require('bcryptjs');
const { catchAsync } = require('../utils/catchAsync');
const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_S, {
    expiresIn: process.env.JWT_E
  });
};
exports.signup = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    const token = signToken(newUser._id);
    res.status(200).send({
      status: 'success',
      token: token,
      data: {
        user: newUser
      }
    });
  } catch (err) {
    console.log(err);
    res.status(404).send({
      status: 'failed',
      msg: err
    });
  }
};
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('please provide email and password', 400));
  }
  const user = await User.findOne({ email: email }).select('+password');
  const correct = await bcrypt.compare(password, user.password);
  if (!user || !correct) {
    return next(new AppError('incorrect email or password', 401));
  }
  const token = signToken(user._id);
  console.log(user);
  res.status(200).send({
    status: 'success',
    token
  });
});
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  console.log(token);
  if (!token) {
    return next(new AppError('you are not logged in! please login', 401));
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_S);
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new Error('The user belonging to this token no longer exist', 401)
    );
  }
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('user recently changed the password', 401));
  }
  req.user = currentUser;
  next();
});
