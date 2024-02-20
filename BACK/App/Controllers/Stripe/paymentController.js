const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const verifyToken = require('../../Middlewares/authMiddleware');

const paymentController = {
  async addStripePayment(req, res) {
    try {
      const { amount, token, paymentMethodId } = req.body;
      console.log('Request Body:', req.body);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method: paymentMethodId,
        confirm: true,
  
      });
      console.log('PaymentIntent crée:', paymentIntent);
      console.log('PaymentIntent statut:', paymentIntent.status);
      res.json({
        clientSecret: paymentIntent.client_secret,
        amount: amount,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = paymentController;
