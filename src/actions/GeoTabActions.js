import axios from "axios";
import {
  FETCH_GEOFENCES_SUCCESS,
  FETCH_GEOFENCES_FAILURE,
  FETCH_ESPECIFIC_GEOFENCE_SUCCESS,
  RESET_ESPECIFIC_GEOFENCE_REDUCER,
  FETCH_DEVICE_STATUS_SUCCES,
  FETCH_DEVICE_STATUS_IS_LOADING,
  RESET_DEVICE_STATUS_REDUCER,
  FETCH_DEVICE_STATUS_FAILURE,
  RESET_GEOFENCES_DATA,
  FETCH_ROUTES_IS_LOADING,
  FETCH_ROUTES_SUCCEEDED,
  FETCH_ROUTES_FAILED
} from "./ActionsTypes";

import { GeoTabRequestBodyEncapsulator, farm, host } from "./GeotabConsts";
import { getLocalGeotabCredentials } from "../AsyncStorage";
import { fetchGTRoutes } from "../GeotabApi/GTRoutes";

export const getGeofencesAction = () => {
  return async dispatch => {
    dispatch({ type: FETCH_ROUTES_IS_LOADING });
    try {
      const credentials = await getLocalGeotabCredentials();
      const routes = await fetchGTRoutes(JSON.parse(credentials));
      dispatch({ type: FETCH_ROUTES_SUCCEEDED, payload: routes });
    } catch (error) {
      dispatch({
        type: FETCH_ROUTES_FAILED,
        payload: "Verifica tu conexión a internet y vuelve a intentarlo"
      });
    }
  };
};

export const resetGeofencesReducerAction = () => {
  return dispatch => {
    dispatch({ type: RESET_GEOFENCES_DATA });
  };
};

export const getEspecificGeofenceAction = (geofenceId, credentials) => {
  return dispatch => {
    const body = new GeoTabRequestBodyEncapsulator("Get", {
      typeName: "Zone",
      credentials: credentials,
      search: { id: geofenceId }
    });

    axios
      .post(`https://${farm}.${host}/apiv1`, body)
      .then(({ data }) => {
        const { result } = data;
        dispatch({
          type: FETCH_ESPECIFIC_GEOFENCE_SUCCESS,
          payload: result[0]
        });
      })
      .catch(err => {
        reject(err);
      });
  };
};

export const resetEspecificGeofenceReducerAction = () => {
  return dispatch => {
    dispatch({ type: RESET_ESPECIFIC_GEOFENCE_REDUCER });
  };
};

export const fetchDeviceStatusAction = (deviceId, credentials) => {
  return dispatch => {
    dispatch({ type: FETCH_DEVICE_STATUS_IS_LOADING });
    const body = new GeoTabRequestBodyEncapsulator("Get", {
      typeName: "DeviceStatusInfo",
      credentials: credentials,
      search: { deviceSearch: { id: deviceId } }
    });

    axios
      .post(`https://${farm}.${host}/apiv1`, body)
      .then(({ data }) => {
        const { result } = data;
        const status = result[0];
        dispatch({ type: FETCH_DEVICE_STATUS_SUCCES, payload: status });
      })
      .catch(err => {
        dispatch({
          type: FETCH_DEVICE_STATUS_FAILURE,
          payload: "Verifica tu conexión a internet y vuelve a intentarlo"
        });
      });
  };
};

export const resetDeviceStatusReducerAction = () => {
  return dispatch => {
    dispatch({ type: RESET_DEVICE_STATUS_REDUCER });
  };
};
