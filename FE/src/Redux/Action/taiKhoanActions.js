import * as taiKhoanActionTypes from './../Constants/taiKhoanActionTypes';

export const setAccountInfo = (info) => ({
  type: taiKhoanActionTypes.SET_ACCOUNT_INFO,
  payload: {
    taiKhoanInfo: info
  }
});