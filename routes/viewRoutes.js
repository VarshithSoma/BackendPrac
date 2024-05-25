const express = require('express');
const { model } = require('mongoose');
const viewController = require('../controllers/viewController');
const router = express.Router();
router.get('/', viewController.getOverview);
router.get('/tour/:slug', viewController.getTour);
router.get('/login', viewController.getLoginForm);
module.exports = router;
