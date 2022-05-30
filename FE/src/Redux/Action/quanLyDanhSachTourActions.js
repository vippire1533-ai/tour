import { default as axios } from './../../utils/axios';
import * as quanLyDanhSachTourActionTypes from './../Constants/quanLyDanhSachTourActionTypes';
import dotenv from 'dotenv';

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
      alert(error.message);
    }
  };
};
