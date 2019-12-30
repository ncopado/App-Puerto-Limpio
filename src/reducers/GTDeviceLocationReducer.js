import _ from "lodash";
import {
  FETCH_DEVICE_LOCATION_IS_LOADING,
  FETCH_DEVICE_LOCATION_SUCCEEDED,
  FETCH_DEVICE_LOCATION_FAILED
} from "../actions/ActionsTypes";

const INITIAL_STATE = {
  deviceLocation: {},
  errorMessage: null,
  isLoading: false
};

export const deviceLocationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_DEVICE_LOCATION_IS_LOADING:
      return {
        ...state,
        isLoading: true,
        deviceLocation: {},
        errorMessage: null
      };
    case FETCH_DEVICE_LOCATION_SUCCEEDED:
      const { payload } = action;
      const { deviceId, latitude, longitude } = payload;

      const { deviceLocation } = state;

      deviceLocation[deviceId] = { latitude, longitude };

      console.log(deviceLocation);
      

      return {
        isLoading: false,
        deviceLocation,
        errorMessage: null
      };
    case FETCH_DEVICE_LOCATION_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};
