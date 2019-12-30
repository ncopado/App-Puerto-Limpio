import {
  FETCH_TIPS_SUCCESFULL,
  FETCH_TIPS_IS_LOADING
} from "../actions/ActionsTypes";

const INITIAL_STATE = {
  tips: null,
  isLoadingTips: false
};

export const tipsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_TIPS_SUCCESFULL:
      return { tips: action.payload, isLoadingTips: false };
    case FETCH_TIPS_IS_LOADING:
      return { ...state, isLoadingTips: true };
    default:
      return state;
  }
};
