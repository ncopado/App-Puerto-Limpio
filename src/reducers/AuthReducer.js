import {
  PASSWORD_CHANGED,
  EMAIL_CHANGED,
  SIGNIN_IS_LOADING,
  SIGNIN_SUCCESS,
  SIGNIN_FAILED,
  CONFIRM_PASSWORD_CHANGED,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  SIGNUP_IS_LOADING,
  RESET_AUTH,
  LAST_NAME_CHANGED,
  NAME_CHANGED
} from "../actions/ActionsTypes";

const INITIAL_STATE = {
  password: "",
  confirmPassword: "",
  email: "",
  name: "",
  lastName: "",
  loading: false,
  errorDescription: null
};

export const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RESET_AUTH:
      return INITIAL_STATE;
    case SIGNUP_IS_LOADING:
    case SIGNIN_IS_LOADING:
      return { ...state, loading: true, errorDescription: null };
    default:
      return state;
  }
};
