import {
  FETCH_DRIVERS_SUCCESS,
  FETCH_DRIVERS_IS_LOADING
} from "../actions/ActionsTypes";
import _ from "lodash";

const INITIAL_STATE = {
  drivers: [],
  isLoadingDrivers: false
};

export const driversReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_DRIVERS_SUCCESS:
      return { drivers: action.payload, isLoadingDrivers: false };
    case FETCH_DRIVERS_IS_LOADING:
      return { ...state, isLoadingDrivers:true };
    default:
      return state;
  }
};
