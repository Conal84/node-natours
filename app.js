const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// Middleware HTTP request logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json()); // Needed for populating req.body
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/user', userRouter);

// Handle unhandled routes and send a json response from our API
// app.all works for get, post, patch, etc requests
// Must be placed after all other routes
// Whenever we pass something into next Express assumes that its an error
// And Express will then call the global error handler
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Error handling middleware function
// Express auto calls this when there is an error
app.use(globalErrorHandler);

module.exports = app;
