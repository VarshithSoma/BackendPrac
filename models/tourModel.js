const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A Tour Must Have A Name'],
    unique: true
  },
  duration: {
    type: Number,
    required: [true, 'A Tour Must Have A Duration']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A Tour Must Have A GroupSize']
  },
  difficulty: {
    type: String,
    required: [true, 'A Tour Must Have A Difficulty']
  },
  ratingsAverage: {
    type: Number,
    default: 4.5
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: [true, 'A Tour Must Have A Price']
  },
  priceDiscount: {
    type: Number
  },
  summary: {
    type: String,
    trim: true,
    required: [true, 'A Tour Must Have A Summary']
  },
  description: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String,
    required: [true, 'A Tour Must Have A Cover Image']
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now()
  },
  startDates: [Date]
});
const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
