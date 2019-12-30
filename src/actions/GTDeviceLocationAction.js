import {
  FETCH_DEVICE_LOCATION_IS_LOADING,
  FETCH_DEVICE_LOCATION_FAILED,
  FETCH_DEVICE_LOCATION_SUCCEEDED
} from "./ActionsTypes";
import { getLocalGeotabCredentials } from "../AsyncStorage";
import { fetchDeviceLocation } from "../GeotabApi/GTDeviceLocation";

export const fetchDeviceLocationAction = deviceId => {
  return async dispatch => {
    dispatch({ type: FETCH_DEVICE_LOCATION_IS_LOADING });
    try {
      const credentials = await getLocalGeotabCredentials();
      const data = await fetchDeviceLocation(JSON.parse(credentials), deviceId);
      const { latitude, longitude } = data;
      dispatch({
        type: FETCH_DEVICE_LOCATION_SUCCEEDED,
        payload: { deviceId, latitude, longitude }
      });
    } catch (error) {
      dispatch({ type: FETCH_DEVICE_LOCATION_FAILED, payload: error });
    }
  };
};
