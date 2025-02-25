const Stripe = require('stripe');
const Tour = require('../models/tourModel');
const { catchAsync } = require('../utils/catchAsync');
const factory = require('./handlerFactory');
exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const stripe = Stripe(
    'sk_test_51POcD7SCLcqjEKvKWPchTw3RtHl1wM3ggBVuZufepPbN6h0bkS8Z3fPzT5QFWSAyzfrWaKMQmhakDgsyxhulMlZK00c1CbOOSH'
  );
  const tour = await Tour.findById(req.params.tourId);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'usd',
          unit_amount: tour.price,
          product_data: {
            name: `${tour.name} Tour`,
            description: tour.summary,
            images: [`https://www.natours.dev/img/tours/${tour.imageCover}`]
          }
        }
      }
    ],
    mode: 'payment'
  });
  res.status(200).json({
    status: 'success',
    session
  });
});
