const verifyToken = require('../../Middlewares/authMiddleware');

const paymentController = {
async addStripePayment(req, res) {
  try {
    const { amount } = req.body; 

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd', 
      payment_method: token,
      confirm: true,
     });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
},
};

module.exports = paymentController;