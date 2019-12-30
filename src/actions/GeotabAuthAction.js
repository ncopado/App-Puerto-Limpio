import axios from "axios";
import { AsyncStorage } from "react-native";
import {
  GEOTAB_SIGNUP_SUCCESS,
  GEOTAB_SIGNUP_FAILED,
  GEOTAB_SIGNUP_IS_LOADING
} from "./ActionsTypes";

import { GeoTabRequestBodyEncapsulator, farm, host } from "./GeotabConsts";
import {
  getLocalGeotabCredentials,
  setLocalGeotabCredentials,
  setLastGTLogin,
  getLastGTLogin
} from "../AsyncStorage";
import { signinToGT } from "../GeotabApi/GTAuth";

export const authenticateToGeoTabAction = () => {
  return async dispatch => {
    dispatch({ type: GEOTAB_SIGNUP_IS_LOADING });
    try {
      await getLocalGeotabCredentials();
      const lastLogin = await getLastGTLogin();
      const daysSinceLastLogin = calculateDaysSinceLastGTLogin(lastLogin);
      daysSinceLastLogin < 10
        ? dispatch({ type: GEOTAB_SIGNUP_SUCCESS })
        : getCredentiaslFromGeoTab(dispatch);
    } catch (error) {
      getCredentiaslFromGeoTab(dispatch);
    }
  };
};

calculateDaysSinceLastGTLogin = timestamp => {
  const lastLogin = Number(timestamp);
  const nowTime = new Date().getTime();
  const oneDay = 24 * 60 * 60 * 1000;
  return (nowTime - lastLogin) / oneDay;
};

getCredentiaslFromGeoTab = async dispatch => {
  try {
    const GTCredentials = await signinToGT();
    await setLocalGeotabCredentials(GTCredentials);
    await setLastGTLogin();
    dispatch({ type: GEOTAB_SIGNUP_SUCCESS });
  } catch (error) {
    dispatch({ type: GEOTAB_SIGNUP_FAILED });
  }
};
