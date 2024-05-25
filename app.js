const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const express = require('express');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalError = require('./controllers/errorController');
const reviewRouter = require('./routes/reviewRoutes');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const helment = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const viewRouter = require('./routes/viewRoutes');
const xss = require('xss-clean');
const hpp = require('hpp');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
app.use(cookieParser());
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'script-src': [
          "'self'", // allow scripts from your own domain
          "'unsafe-inline'", // allow inline scripts (you may want to remove this depending on your needs)
          'https://api.mapbox.com' // allow scripts from the Mapbox CDN
        ],
        'worker-src': [
          "'self'", // allow web workers from your own domain
          'http://localhost:3000', // allow web workers from the current host (development environment)
          'https://api.mapbox.com', // allow web workers from the Mapbox CDN
          'blob:' // allow web workers from blob URLs
        ],
        'connect-src': [
          "'self'", // allow connections to your own domain
          'https://api.mapbox.com', // allow connections to the Mapbox API
          'https://events.mapbox.com' // allow connections to Mapbox events
        ]
      }
    }
  })
);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 100,
  message: 'too many requests from this ip ,please try again in an hour'
});
app.use(mongoSanitize());
app.use(xss());
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);
app.use(helment());
app.use('/api', limiter);
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.cookies);
  next();
});
app.use('/', viewRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`cant find ${req.originalUrl} on this server`, 404));
});
app.use(globalError);
module.exports = app;
