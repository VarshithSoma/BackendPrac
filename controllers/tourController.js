const Tour = require('./../models/tourModel');
const express = require('express');
const { query } = require('express');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync').catchAsync;
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};
exports.getAllTours = async (req, res) => {
  try {
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours: tours
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      msg: err
    });
  }
};
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return next(new AppError('No tour found with that id ', 404));
    }
    res.status(200).json({
      status: 'success',
      data: tour
    });
  } catch (err) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id'
    });
  }
};

exports.createTour = catchAsync(async (req, res) => {
  const newTour = await Tour.create(req.body);
  res.status(201).json({
    status: 'success',
    tours: newTour
  });
});
exports.updateTour = async (req, res) => {
  try {
    const newTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      newTour
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      msg: err
    });
  }
};
exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success'
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      data: null
    });
  }
};
exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } }
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          maxPrice: { $max: '$price' },
          minPrice: { $min: '$price' }
        }
      },
      {
        $sort: { avgPrice: 1 }
      }
      // {
      //   $match: { _id: { $ne: 'EASY' } }
      // }
    ]);
    res.status(200).send({
      status: 'success',
      data: { stats }
    });
  } catch (err) {
    res.status(404).send({
      status: 'fail',
      msg: err
    });
  }
};
exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.id;
    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates'
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' }
        }
      },
      {
        $addFields: { month: '$_id' }
      },
      {
        $project: {
          _id: 0
        }
      },
      {
        $sort: {
          numTourStarts: -1
        }
      },
      {
        $limit: 12
      }
    ]);
    res.status(200).send({
      status: 'success',
      data: {
        plan
      }
    });
  } catch (err) {
    res.status(404).send({ status: 'failed', msg: err });
  }
};
