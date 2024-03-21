const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const verifyToken = require('../../Middlewares/authMiddleware');

const paymentController = {
  async addStripePayment(req, res) {
    try {
      const { convertedAmout, token, paymentMethodId } = req.body;
      console.log('Request Body:', req.body);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: convertedAmout,
        currency: 'usd',
        payment_method: paymentMethodId,
        confirm: true,
        return_url: `${process.env.REACT_APP_IMAGES_URL}/payment`,
      });
      console.log('PaymentIntent crée:', paymentIntent);
      console.log('PaymentIntent statut:', paymentIntent.status);
      res.json({
        clientSecret: paymentIntent.client_secret,
        amount: convertedAmout,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = paymentController;
