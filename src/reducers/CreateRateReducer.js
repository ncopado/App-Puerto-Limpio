import {
  CREATE_RATE_SUCCES,
  CREATE_RATE_IS_LOADING,
  RESET_CREATE_RATE_REDUCER,
  CREATE_RATE_FAILURE
} from "../actions/ActionsTypes";
import _ from "lodash";

const INITIAL_STATE = {
  created: false,
  error: false,
  createRateIsLoading: false
};

export const createRateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_RATE_SUCCES:
      return { created: true, error: false, createRateIsLoading: false };
    case CREATE_RATE_FAILURE:
      return { ...state, createRateIsLoading: false, error: true };
    case CREATE_RATE_IS_LOADING:
      return {
        ...state,
        createRateIsLoading: true
      };
    case RESET_CREATE_RATE_REDUCER:
    default:
      return INITIAL_STATE;
  }
};
