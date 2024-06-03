const express = require('express');
const { model } = require('mongoose');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const router = express.Router();
router.use(authController.isLoggedIn);
router.get('/', viewController.getOverview);
router.get('/tour/:slug', viewController.getTour);
router.get('/login', viewController.getLoginForm);
router.get('/me', authController.protect, viewController.getAccount);
router.post(
  '/submit-user-data',
  authController.protect,
  viewController.updateUserData
);
module.exports = router;
