import {
  FETCH_VEHICLES_STATUS_SUCCES,
  FETCH_VEHICLES_STATUS_FAILURE,
  RESET_VEHICLES_STATUS_REDUCER,
  FETCH_VEHICLES_STATUS_IS_LOADING
} from "../actions/ActionsTypes";
import _ from "lodash";

const INITIAL_STATE = {
  vehiclesStatus: [],
  isLoadingDevicesStatus: true,
  vehiclesStatusErrorMessage: "",
  vehiclesStatusError: false
};

export const vehiclesStatusReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_VEHICLES_STATUS_IS_LOADING:
      return { ...state, isLoadingDevicesStatus: true };
    case FETCH_VEHICLES_STATUS_SUCCES:
      return {
        ...state,
        isLoadingDevicesStatus: false,
        vehiclesStatus: action.payload
      };
    case FETCH_VEHICLES_STATUS_FAILURE:
      return {
        ...state,
        isLoadingDevicesStatus: false,
        vehiclesStatusError: true,
        vehiclesStatusErrorMessage: action.payload
      };
    case RESET_VEHICLES_STATUS_REDUCER:
      return INITIAL_STATE;
    default:
      return state;
  }
};
