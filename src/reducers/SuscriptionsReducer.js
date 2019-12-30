import {
  FECTH_SUSCRIPTIONS_SUCCESS,
  FETCH_SUSCRIPTIONS_IS_LOADING
} from "../actions/ActionsTypes";
import _ from "lodash";

const INITIAL_STATE = { suscriptions: [], loadingSuscriptions: false };

export const suscriptionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FECTH_SUSCRIPTIONS_SUCCESS:
      return {
        ...state,
        suscriptions: action.payload,
        loadingSuscriptions: false
      };
    case FETCH_SUSCRIPTIONS_IS_LOADING:
      return { ...state, loadingSuscriptions: true };
    default:
      return state;
  }
};
