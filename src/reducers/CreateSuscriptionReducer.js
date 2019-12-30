import {
  SUSCRIPTION_CREATE_SUCCESS,
  SUSCRIPTION_CREATE_ALREADY_EXISTS,
  RESET_SUSCRIPTION_CREATE_DATA,
  SUSCRIPTION_CREATE_FAILURE
} from "../actions/ActionsTypes";
import _ from "lodash";

const INITIAL_STATE = {
  created: false,
  createSuscriptionError: false,
  suscriptionAlreadyExists: false,
  createSuscriptionIsLoading: false
};

export const createSuscriptionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SUSCRIPTION_CREATE_SUCCESS:
      return { ...state, created: true ,createSuscriptionIsLoading:false};
    case SUSCRIPTION_CREATE_ALREADY_EXISTS:
      return {
        ...state,
        suscriptionAlreadyExists: true,createSuscriptionIsLoading:false
      };
    case RESET_SUSCRIPTION_CREATE_DATA:
      return INITIAL_STATE;
    case SUSCRIPTION_CREATE_FAILURE:
      return { ...state, createSuscriptionError: true };
    default:
      return state;
  }
};
