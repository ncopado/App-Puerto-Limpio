import {
  FETCH_VEHICLE_DETAIL_SUCCESS,
  RESET_VEHICLE_DETAIL_REDUCER
} from "../actions/ActionsTypes";
import _ from "lodash";

const INITIAL_STATE = {
  nombreVehiculo: "Cargando"
};

export const vehicleDetailReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_VEHICLE_DETAIL_SUCCESS:
      const { nombre } = action.payload;
      return { nombreVehiculo: nombre };
    case RESET_VEHICLE_DETAIL_REDUCER:
      return INITIAL_STATE;
    default:
      return state;
  }
};
