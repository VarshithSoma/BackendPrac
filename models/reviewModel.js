const { Stats } = require('fs');
const mongoose = require('mongoose');
const Tour = require('./tourModel');
const reviewSchema = mongoose.Schema(
  {
    review: {
      type: String,
      require: [true]
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      require: true
    },
    createdAt: {
      type: Date,
      require: true,
      default: Date.now()
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      require: [true, 'review must belong to a tour']
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      require: [true, 'review must belong to a User']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);
reviewSchema.pre(/^find/, function(next) {
  //   this.populate({ path: 'tour', select: 'name' }).populate({
  //     path: 'user',
  //     select: 'name photo'
  //   });
  this.populate({
    path: 'user',
    select: 'name photo'
  });
  next();
});
reviewSchema.statics.calcAverageRating = async function(tourId) {
  const stats = await this.aggregate([
    {
      $match: {
        tour: tourId
      }
    },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);
  console.log(stats);
  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5
    });
  }
};
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });
reviewSchema.post('save', function() {
  this.constructor.calcAverageRating(this.tour);
});
reviewSchema.pre(/^findOneAnd/, async function(next) {
  this.r = await this.model.findOne(this.getQuery());
  console.log(this.r);
  next();
});
reviewSchema.post(/^findOneAnd/, async function() {
  //await this.findOne() does not work here the query has been executed
  await this.r.constructor.calcAverageRating(this.r.tour);
});
const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
