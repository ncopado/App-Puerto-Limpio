import {
  GET_USER_LOCATION_SUCCESS,
  GET_USER_LOCATION_FAILURE,
  RESET_USER_LOCATION_REDUCER,
  GET_USER_LOCATION_IS_LOADING
} from "./ActionsTypes";

export const getUserLocationAction = () => {

  
  return dispatch => {
    dispatch({ type: GET_USER_LOCATION_IS_LOADING });
    navigator.geolocation.getCurrentPosition(
      position => {
        dispatch({ type: GET_USER_LOCATION_SUCCESS, payload: position });
      },
      error => {
        dispatch({ type: GET_USER_LOCATION_FAILURE, payload: error });
      },
      {
        enableHighAccuracy: false,
        timeout: 20000,
        maximumAge: 1000
      }
    );
  };
};

export const resetUserLocationReducerActions = () => {
  return dispatch => {
    dispatch({ type: RESET_USER_LOCATION_REDUCER });
  };
};
