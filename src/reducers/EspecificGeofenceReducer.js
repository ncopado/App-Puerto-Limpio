import {
  FETCH_ESPECIFIC_GEOFENCE_SUCCESS,
  RESET_ESPECIFIC_GEOFENCE_REDUCER
} from "../actions/ActionsTypes";
import _ from "lodash";
const INITIAL_STATE = { geofence: null };

export const especificGeofenceReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ESPECIFIC_GEOFENCE_SUCCESS:
      const geofence = action.payload;
      const { points } = geofence;
      const polygonCoordinates = _.map(points, point => {
        return { longitude: point.x, latitude: point.y };
      });
      geofence.points = polygonCoordinates;
      return { geofence: action.payload };
    case RESET_ESPECIFIC_GEOFENCE_REDUCER:
      return INITIAL_STATE;
    default:
      return state;
  }
};
