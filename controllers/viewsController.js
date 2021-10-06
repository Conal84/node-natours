const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get all tour data from collection
  const tours = await Tour.find();

  // 2) Build template

  // 3) Render template using tour data from step 1)
  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // 1) get the data for the requested tour (including reviews and guides)
  // guides are auto populated in the model
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  // 2) build the template

  // 3) render the template using data from step 1)
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
});
