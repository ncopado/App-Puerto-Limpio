import {
  FETCH_DRIVER_DETAIL_SUCCESS,
  RESET_DRIVER_DETAIL_REDUCER
} from "../actions/ActionsTypes";
import _ from "lodash";

const INITIAL_STATE = {
  driverName: "Cargando"
};

export const driverDetailReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_DRIVER_DETAIL_SUCCESS:
      const { nombre } = action.payload;
      return { driverName: nombre };
    case RESET_DRIVER_DETAIL_REDUCER:
      return INITIAL_STATE;
    default:
      return state;
  }
};
