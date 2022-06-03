import dotenv from 'dotenv';
import Swal from 'sweetalert2';
import { default as axios } from './../../utils/axios';
import * as appActions from './../Action/appActions';
import * as quanLyDanhSachTourActionTypes from './../Constants/quanLyDanhSachTourActionTypes';

dotenv.config();

const host =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_BACKEND_URL
    : process.env.REACT_APP_DEV_BACKEND_URL;
const BASE_URL = '/api/products';

const taoDanhSachDuongDanAnh = (data) => {
  return data.map((item) => ({
    ...item,
    DANH_SACH_LINK_ANH: item.DANH_SACH_ANH.map((idAnh) => `${ host }/api/tour/images/${ idAnh }`),
  }));
};

export const layTatCaDanhSachTour = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(BASE_URL);
      const danhSachTour = taoDanhSachDuongDanAnh(data);
      dispatch({
        type: quanLyDanhSachTourActionTypes.SET_DANH_SACH_TOUR,
        payload: {
          danhSachTour,
        },
      });
    } catch (error) {
      Swal.fire({
        title: 'Lỗi',
        text: `Có lỗi trong quá trình tải danh sách tour. Lỗi: ${ error.message }`,
        icon: 'error'
      });
    }
  };
};


export const deleteTourById = (maTour) => {
  return async (dispatch) => {
    try {
      dispatch(appActions.showLoading());
      await axios.delete(`${ BASE_URL }/${ maTour }`);
      dispatch(layTatCaDanhSachTour());
      dispatch(appActions.hideLoading());
    } catch (error) {
      dispatch(appActions.hideLoading());
      Swal.fire({
        title: 'Lỗi',
        text: `Có lỗi trong quá trình xóa tour. Lỗi: ${ error.message }`,
        icon: 'error'
      });
    }
  };
};
