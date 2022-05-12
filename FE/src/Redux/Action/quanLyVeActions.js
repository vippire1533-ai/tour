import * as quanLyVeActionType from '../Constants/quanLyVeActionTypes';
import * as appActions from './../Action/appActions';
import axios from 'axios';

export const getAllTickets = () => {
  const api = '/api/veproducts';
  return async (dispatch) => {
    try {
      dispatch(appActions.showLoading());
      const { data } = await axios.get(api);
      dispatch({
        type: quanLyVeActionType.SET_TICKETS,
        payload: {
          tickets: data,
        },
      });
      setTimeout(() => {
        dispatch(appActions.hideLoading());
      }, 500);
      return data;
    } catch (error) {
      throw error;
    }
  };
};

export const deleteTicket = (maVe) => {
  const api = `/api/veproducts/${ maVe }`;
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(api);
      dispatch(getAllTickets());
      dispatch(appActions.showModal());
      setTimeout(() => {
        dispatch(appActions.hideLoading());
      }, 500);
      return data;
    } catch (error) {
      throw error;
    }
  };
};
