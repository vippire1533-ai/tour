import PunchClockIcon from '@mui/icons-material/PunchClock';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Switch } from 'antd';
import React, { useState } from 'react';
import classes from './styles.module.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import * as appActions from './../../../Redux/Action/appActions';
import { useDispatch } from 'react-redux';
const label = { inputProps: { 'aria-label': 'Switch demo' } };

const CheckoutForm = ({ onPayment, paymentIntents }) => {
  //#region Initialize state
  const [checked, setChecked] = useState(false);
  //#endregion

  //#region Initialize hook
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //#endregion

  //#region Handle Event
  const handlePayment = (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      Swal.fire({
        title: 'Lỗi Thanh Toán',
        text: 'Không thể khởi tạo phiên giao dịch. Vui lòng liên hệ quản trị viên',
      });
      return;
    }

    Swal.fire({
      title: 'Xác Nhận Đặt Tour',
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Hủy',
    }).then((res) => {
      if (res.isConfirmed) {
        dispatch(appActions.showLoading());
        return stripe
          .confirmPayment({
            elements,
            redirect: 'if_required',
          })
          .then((result) => {
            if (result.error) {
              throw result.error;
            } else {
              return onPayment();
            }
          })
          .catch((e) => {
            dispatch(appActions.hideLoading());
            Swal.fire({
              title: `Đặt vé không thành công. Lỗi: ${e.message}`,
              icon: 'error',
            });
          });
      }
    });
  };
  //#endregion

  return (
    <div className={classes.container}>
      <PaymentElement />
      <div style={{ padding: '18px 0' }}>
        <Switch
          {...label}
          checked={checked}
          onChange={() => {
            setChecked(!checked);
          }}
          size='small'
        />
        <span style={{ paddingLeft: '16px' }}>Nhập mã giảm giá</span>
        {checked && (
          <div>
            <input placeholder='VD: CHEAPTRAVEL' className={classes['switch-input']} />
            <button className={classes.apdung}>Áp dụng mã</button>
          </div>
        )}
      </div>
      <div className={classes.dieukhoan}>
        <p>
          Bằng việc nhấn thanh toán, bạn đồng ý <span>Điều khoản & điều kiện</span> và
          <span> Chính sách quyền riêng tư.</span>
        </p>
      </div>
      <div className={classes.thanhtoan}>
        <button onClick={handlePayment}>
          <PunchClockIcon style={{ fontSize: '16px', marginRight: '20px' }} />
          <span>Thanh toán Thẻ thanh toán</span>
        </button>
      </div>
    </div>
  );
};

export default CheckoutForm;
