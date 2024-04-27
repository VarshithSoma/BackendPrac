const Tour = require('./../models/tourModel');
const express = require('express');

exports.getAllTours = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excluededFields = ['sort', 'limit', 'page', 'fields'];
    excluededFields.forEach(el => delete queryObj[el]);
    console.log(req.query, queryObj);
    const tours = await Tour.find(queryObj);
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
    res.status(200).json({
      status: 'success',
      data: tour
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id'
    });
  }
};
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      tours: newTour
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      msg: 'Invalid Data Sent!!!',
      err
    });
  }
};
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
