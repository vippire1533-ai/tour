import { Elements } from '@stripe/react-stripe-js';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as appActions from './../../Redux/Action/appActions';
import { default as axios } from './../../utils/axios';
import LoadingSpinner from './../LoadingSpinner';
import stripePromise from './loadStripe';

const LazyCheckoutForm = lazy(() => import('./CheckoutForm/CheckoutForm'));

const Stripe = ({ amount, onPayment }) => {
  //#region Initialize state
  const [options, setOptions] = useState({
    appearance: {
      theme: 'stripe',
    },
    clientSecret: null,
  });
  const [paymentIntents, setPaymentIntents] = useState(null);
  //#endregion

  //#region Initialize hook
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.appState);

  useEffect(() => {
    dispatch(appActions.showLoading());
    axios
      .post('/api/payment_intents', { amount })
      .then((res) => {
        setPaymentIntents(res.data);
        setOptions((prevState) => ({ ...prevState, clientSecret: res.data.client_secret }));
        dispatch(appActions.hideLoading());
      })
      .catch((err) => {
        dispatch(appActions.hideLoading());
        Swal.fire({
          title: 'Lỗi',
          text: `Cõ lỗi trong quá trình tạo hóa đơn thanh toán. Lỗi: ${err.message}`,
          icon: 'error',
        }).then(() => {
          navigate('/tour');
        });
      });
  }, []);
  //#endregion

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <Suspense fallback={<LoadingSpinner />}>
        {options.clientSecret && (
          <Elements stripe={stripePromise} options={options}>
            <LazyCheckoutForm onPayment={onPayment} paymentIntents={paymentIntents} />
          </Elements>
        )}
      </Suspense>
    </>
  );
};

export default Stripe;
