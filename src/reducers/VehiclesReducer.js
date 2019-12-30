import {
  FETCH_VEHICLES_SUCCESS,
  FETCH_VEHICLES_IS_LOADING
} from "../actions/ActionsTypes";
import _ from "lodash";

const INITIAL_STATE = {
  vehicles: [],
  isLoadingVehicles: false
};

export const vehiclesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_VEHICLES_SUCCESS:
      return { vehicles: action.payload, isLoadingVehicles: false };
    case FETCH_VEHICLES_IS_LOADING:
      return { ...state, isLoadingVehicles: true };
    default:
      return state;
  }
};
