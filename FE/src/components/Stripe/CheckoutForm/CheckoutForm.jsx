import React from 'react';
import { PaymentElement } from '@stripe/react-stripe-js';
import classes from './styles.module.css';

const CheckoutForm = () => {
  return (
    <div className={classes.container}>
      <PaymentElement />
    </div>
  );
};

export default CheckoutForm;
