const express = require('express');
const fs = require('fs');
const Router = express.Router();
const tourController = require('./../controllers/tourController');
Router.route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

Router.route('/:id')
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour)
  .get(tourController.getTour);
module.exports = Router;
