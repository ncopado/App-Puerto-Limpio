import {
  FETCH_DEVICES_INFO_SUCCESS,
  RESET_GEOFENCE_DETAIL_REDUCER,
  FETCH_GEOFENCE_DETAIL_SUCCES
} from "../actions/ActionsTypes";
import _ from "lodash";

const INITIAL_STATE = { geofenceDetail: null };

export const geofenceDetailReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_GEOFENCE_DETAIL_SUCCES:
      return { geofenceDetail: action.payload };
    case RESET_GEOFENCE_DETAIL_REDUCER:
      return INITIAL_STATE;
    default:
      return state;
  }
};
