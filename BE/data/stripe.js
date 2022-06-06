import dotenv from 'dotenv';
import stripe from 'stripe';

dotenv.config();
const stripeInstance = stripe(process.env.STRIPE_SERCET_KEY);

const stripeHandler = async (req, res, next) => {
  try {
    console.log(req.body);
    const amount = +req.body.amount;
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount,
      currency: 'vnd',
      payment_method_types: ['card'],
    });
    return res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

export default stripeHandler;
