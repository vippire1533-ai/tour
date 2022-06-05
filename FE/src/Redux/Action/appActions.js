import * as appActionTypes from './../Constants/appActionTypes';
import { default as axios } from './../../utils/axios';
import Swal from 'sweetalert2';

export const showLoading = () => ({
  type: appActionTypes.SHOW_LOADING,
});

export const hideLoading = () => ({
  type: appActionTypes.HIDE_LOADING,
});

export const showModal = () => ({
  type: appActionTypes.SHOW_MODAL,
});

export const hideModal = () => ({
  type: appActionTypes.HIDE_MODAL,
});

export const updateApplicaton = () => {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      await axios.post('/api/update-application');
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      Swal.fire({
        title: 'Lỗi',
        icon: 'error',
        text: `Có lỗi trong quá trình cập nhật lại hệ thống. Vui lòng liên quản trị viên`,
      });
    }
  };
};

export const createUserIfNoExists = (data) => {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      await axios.post('/api/create-customer', data);
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      Swal.fire({
        title: 'Lỗi',
        icon: 'error',
        text: `Có lỗi trong quá trình cập nhật người dùng. Lỗi: ${ error.message }`,
      });
    }
  };
};
