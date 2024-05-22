const express = require('express');
const reviewController = require('../controllers/reviewController');
const fs = require('fs');
const Router = express.Router();
const tourController = require('./../controllers/tourController');
const authController = require('../controllers/authController');
const reviewRouter = require('../routes/reviewRoutes');
Router.use('/:tourId/review', reviewRouter);
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
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  )
  .get(tourController.getTour);

// Router.route('/:tourId/reviews').post(
//   authController.protect,
//   authController.restrictTo('user'),
//   reviewController.createReview
// );
module.exports = Router;
