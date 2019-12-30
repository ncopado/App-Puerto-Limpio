import {
  FETCH_ROUTES_SUCCEEDED,
  FETCH_ROUTES_IS_LOADING,
  FETCH_ROUTES_FAILED
} from "../actions/ActionsTypes";
import _ from "lodash";

const INITIAL_STATE = {
  routes: null,
  isLoading: false,
  errorDescription: null
};

export const routesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ROUTES_SUCCEEDED:
      const geofences = action.payload;
      _.forEach(action.payload, geofence => {
        const { points } = geofence;
        const polygonCoordinates = _.map(points, point => {
          return { longitude: point.x, latitude: point.y };
        });
        geofence.points = polygonCoordinates;
      });
      return { ...state, routes: geofences, isLoading: false };
    case FETCH_ROUTES_IS_LOADING:
      return { isLoading: true, errorDescription: null };
    case FETCH_ROUTES_FAILED:
      return {
        ...state,
        isLoading: false,
        errorDescription: action.payload
      };
    default:
      return state;
  }
};
