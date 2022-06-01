import * as taiKhoanActionTypes from './../Constants/taiKhoanActionTypes';

const initialState = {
  thongTinTaiKhoan: null
};

const taiKhoanReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case taiKhoanActionTypes.SET_ACCOUNT_INFO: {
      return {
        ...state,
        thongTinTaiKhoan: payload.taiKhoanInfo
      };
    }
    default: {
      return state;
    }
  }
};

export default taiKhoanReducer;