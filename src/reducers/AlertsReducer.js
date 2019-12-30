import {
  FETCH_ALERTS_IS_LOADING,
  FETCH_ALERTS_SUCCESFULL
} from "../actions/ActionsTypes";
import _ from "lodash";

const INITIAL_STATE = {
  alerts: null,
  isLoadingAlerts: false
};

export const alertsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ALERTS_SUCCESFULL:
      return { alerts: action.payload, isLoadingAlerts: false };
    case FETCH_ALERTS_IS_LOADING:
      return { ...state, isLoadingAlerts: true };
    default:
      return state;
  }
};
