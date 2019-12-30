import {
  GET_USER_LOCATION_SUCCESS,
  GET_USER_LOCATION_FAILURE,
  RESET_USER_LOCATION_REDUCER,
  GET_USER_LOCATION_IS_LOADING
} from "../actions/ActionsTypes";
import _ from "lodash";

const INITIAL_STATE = {
  userCoordinates: null,
  locationError: null,
  locationErrorMessage: "",
  isLoadingUserLocation: false
};

export const userLocationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER_LOCATION_SUCCESS:
      const { coords } = action.payload;
      return {
        ...state,
        userCoordinates: coords,
        isLoadingUserLocation: false
      };
    case GET_USER_LOCATION_FAILURE:
      return {
        ...state,
        locationErrorMessage: action.payload,
        locationError: true,
        isLoadingUserLocation: false
      };
    case GET_USER_LOCATION_IS_LOADING:
      return { ...state, isLoadingUserLocation: true };
    case RESET_USER_LOCATION_REDUCER:
      return INITIAL_STATE;
    default:
      return state;
  }
};
