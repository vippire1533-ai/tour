import * as thongKeActionTypes from './../Constants/thongKeActionTypes';
import { default as axios } from './../../utils/axios';
import Swal from 'sweetalert2';

const BASE_URL = '/api/thongKe';

export const layThongTinThongKe = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${ BASE_URL }`);
      dispatch({
        type: thongKeActionTypes.SET_THONG_KE_DATA,
        payload: {
          thongKeData: data,
        },
      });
      return data;
    } catch (error) {
      Swal.fire({
        title: 'Lỗi',
        text: error.message,
        icon: 'error',
      });
    }
  };
};

export const layThongTinThongKeTheoThang = (thang) => {
  return {
    type: thongKeActionTypes.FILTER_BY_THANG,
    payload: {
      thang,
    },
  };
};
