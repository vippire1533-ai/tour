import { Elements } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { default as axios } from './../../utils/axios';
import CheckoutForm from './CheckoutForm/CheckoutForm';
import stripePromise from './loadStripe';

const Stripe = ({ amount }) => {
  const [options, setOptions] = useState({
    appearance: {
      theme: 'stripe',
    },
    clientSecret: null,
  });

  useEffect(() => {
    axios.post('/api/payment_intents', { amount }).then((res) => {
      setOptions((prevState) => ({ ...prevState, clientSecret: res.data.clientSecret }));
    });
  }, []);
  return (
    <>
      {options.clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default Stripe;
