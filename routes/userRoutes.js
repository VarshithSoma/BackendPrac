const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const Router = express.Router();
Router.get(
  '/me',
  authController.protect,
  userController.getMe,
  userController.getUser
);
Router.post('/signup', authController.signup);
Router.post('/login', authController.login);
Router.post('/forgotPassword', authController.forgotPassword);
Router.patch('/resetPassword/:token', authController.resetPassword);
Router.use(authController.protect);

Router.patch('/updateMyPassword', authController.updatePassword);
Router.delete('/deleteMe', userController.deleteMe);
Router.route('/updateMe', userController.updateMe);
Router.use(authController.restrictTo('admin'));
Router.route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
Router.route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
module.exports = Router;
