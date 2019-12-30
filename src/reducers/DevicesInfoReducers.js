import {
  FETCH_DEVICES_INFO_SUCCESS
} from "../actions/ActionsTypes";
import _ from "lodash";

const INITIAL_STATE = { devicesInfo: [], isDataLoaded: false };

export const devicesInfoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_DEVICES_INFO_SUCCESS:
      return { devicesInfo: action.payload, isDataLoaded: true };
    default:
      return state;
  }
};
