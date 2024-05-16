const express = require('express');
const fs = require('fs');
const Router = express.Router();
const tourController = require('./../controllers/tourController');
const authController = require('../controllers/authController');
Router.route('/top-5-cheap').get(
  tourController.aliasTopTours,
  tourController.getAllTours
);
Router.route('/tour-stats').get(tourController.getTourStats);
Router.route('/monthly-plan/:id').get(tourController.getMonthlyPlan);
Router.route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);

Router.route('/:id')
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour)
  .get(tourController.getTour);
module.exports = Router;
