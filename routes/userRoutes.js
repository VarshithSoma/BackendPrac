const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const Router = express.Router();

Router.post('/signup', authController.signup);
Router.post('/login', authController.login);
Router.post('/forgotPassword', authController.forgotPassword);
Router.patch('/resetPassword/:token', authController.resetPassword);
Router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);
Router.delete('/deleteMe', authController.protect, authController.deleteMe);
Router.route('/updateMe', authController.updateMe, userController.updateMe);
Router.route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
Router.route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
module.exports = Router;
