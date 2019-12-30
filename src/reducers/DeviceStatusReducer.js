import {
  FETCH_DEVICES_INFO_SUCCESS,
  FETCH_DEVICE_STATUS_IS_LOADING,
  FETCH_DEVICE_STATUS_SUCCES,
  FETCH_DEVICES_INFO_FAILURE,
  FETCH_DEVICE_STATUS_FAILURE,
  RESET_DEVICE_STATUS_REDUCER
} from "../actions/ActionsTypes";
import _ from "lodash";

const INITIAL_STATE = {
  deviceStatus: {},
  isloadingDeviceStatus: true,
  deviceStatusErrorMessage: "",
  deviceStatusError: false
};

export const deviceStatusReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_DEVICE_STATUS_IS_LOADING:
      return { ...state, isloadingDeviceStatus: true };

    case FETCH_DEVICE_STATUS_SUCCES:
      return {
        ...state,
        isloadingDeviceStatus: false,
        deviceStatus: action.payload
      };

    case FETCH_DEVICE_STATUS_FAILURE:
      return {
        ...state,
        isloadingDeviceStatus: false,
        deviceStatusError: true,
        deviceStatusErrorMessage: action.payload
      };

    case RESET_DEVICE_STATUS_REDUCER:
      return INITIAL_STATE;
    default:
      return state;
  }
};
