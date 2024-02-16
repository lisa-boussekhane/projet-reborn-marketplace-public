const verifyToken = require('../../Middlewares/authMiddleware');

const payment = {
async addStripePayment(req, res) {
    const { amount, currency, token } = req.body;
  
    try {
      // Create a payment intent using the Stripe API
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        payment_method: token,
        confirm: true,
      });
  
      // Return the payment intent status to the client
      res.json({ status: paymentIntent.status });
  
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while processing the payment.' });
    }
  }
};

module.exports = payment;