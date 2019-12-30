import {
  SUSCRIPTION_CANCELATION_SUCCESS,
  SUSCRIPTION_CANCELATION_FAILURE,
  RESET_SUSCRIPTION_CANCELATION_REDUCER
} from "../actions/ActionsTypes";
import _ from "lodash";

const INITIAL_STATE = {
  success: null,
  suscriptionCancelationErrorMessage: null
};

export const suscriptionsCancelationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SUSCRIPTION_CANCELATION_SUCCESS:
      return { ...state, success: true };
    case SUSCRIPTION_CANCELATION_FAILURE:
      return {
        success: false,
        suscriptionCancelationErrorMessage: "Error al cancelar la suscriptión"
      };
    case RESET_SUSCRIPTION_CANCELATION_REDUCER:
      return INITIAL_STATE;
    default:
      return state;
  }
};
