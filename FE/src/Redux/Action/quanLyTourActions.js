import { default as axios } from './../../utils/axios';
import * as quanLyTourActionTypes from './../Constants/quanLyTourActionTypes';

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
      alert(error.message);
    }
  };
};
