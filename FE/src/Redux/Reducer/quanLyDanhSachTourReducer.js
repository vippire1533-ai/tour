import * as quanLyDanhSachTourActionTypes from './../Constants/quanLyDanhSachTourActionTypes';

const initialState = {
  danhSachTour: [],
};

const quanLyDanhSachTourReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case quanLyDanhSachTourActionTypes.SET_DANH_SACH_TOUR: {
      return {
        ...state,
        danhSachTour: payload.danhSachTour,
      };
    }
    default: {
      return state;
    }
  }
};

export default quanLyDanhSachTourReducer;
