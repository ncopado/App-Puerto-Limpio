
import {
  FETCH_VEHICLES_STATUS_SUCCES,
  FETCH_VEHICLES_STATUS_IS_LOADING,
  FETCH_VEHICLES_STATUS_FAILURE,
  RESET_VEHICLES_STATUS_REDUCER
} from "./ActionsTypes";
import { getLocalGeotabCredentials } from "../AsyncStorage";
import { fetchGTDevicesStatusIndo } from "../GeotabApi/GTDeviceStatusInfo";

export const fetchVehiclesStatusAction = () => {
  return async dispatch => {
    dispatch({ type: FETCH_VEHICLES_STATUS_IS_LOADING });

    try {
      const credentials = await getLocalGeotabCredentials();
      const status = await fetchGTDevicesStatusIndo(JSON.parse(credentials));
      dispatch({ type: FETCH_VEHICLES_STATUS_SUCCES, payload: status });
    } catch (error) {
      dispatch({
        type: FETCH_VEHICLES_STATUS_FAILURE,
        payload: "Verifica tu conexión a internet y vuelve a intentarlo"
      });
    }
  };
};

export const resetVehiclesStatusReducerAction = () => {
  return dispatch => {
    dispatch({
      type: RESET_VEHICLES_STATUS_REDUCER
    });
  };
};
