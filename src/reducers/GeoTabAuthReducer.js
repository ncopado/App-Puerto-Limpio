import {
  GEOTAB_SIGNUP_IS_LOADING,
  GEOTAB_SIGNUP_FAILED,
  GEOTAB_SIGNUP_SUCCESS,
  GEOTAB_RESET_AUTH_REDUCER
} from "../actions/ActionsTypes";

const INITIAL_STATE = {
  geotabAuthIsLoading: false,
  geotabAuthError: false
};

export const GeoTabAuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GEOTAB_SIGNUP_IS_LOADING:
      return { ...state, geotabAuthIsLoading: true, geotabAuthError: false };
    case GEOTAB_SIGNUP_FAILED:
      return { ...state, geotabAuthError: true, geotabAuthIsLoading: false };
    case GEOTAB_SIGNUP_SUCCESS:
      return { ...state, geotabAuthIsLoading: false, geotabAuthError: false };
    case GEOTAB_RESET_AUTH_REDUCER:
    default:
      return state;
  }
};
