import { default as axios } from './../../utils/axios';
import * as quanLyTourActionTypes from './../Constants/quanLyTourActionTypes';
import Swal from 'sweetalert2';

const BASE_URL = '/api/tours';

export const getAllTours = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(BASE_URL);
      dispatch({
        type: quanLyTourActionTypes.SET_TOURS,
        payload: {
          tours: data,
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
