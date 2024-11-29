const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncErrors(async (req, res, next) => {  
  console.log('payment controller--', req.body);
  try{
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "aud",
    metadata: {
      company: "Ecommerce",
    },
  });

  res.status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
  } catch (e) {
    console.log(e.message);
  }  
});


exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
