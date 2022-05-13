import axios from 'axios';
import * as quanLyLoaiTourActionsType from './../Constants/quanLyLoaiTourActionTypes';

export const getAllTourTypes = () => {
  return async (dispatch) => {
    const api = '/api/tourTypes';
    try {
      const { data } = await axios.get(api);
      dispatch({
        type: quanLyLoaiTourActionsType.SET_TOUR_TYPES,
        payload: {
          tourTypes: data
        }
      });
      return data;
    } catch (error) {
      alert(error.message);
    }
  };
};