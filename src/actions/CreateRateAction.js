import firebase from "react-native-firebase";
import {
  CREATE_RATE_IS_LOADING,
  CREATE_RATE_SUCCES,
  CREATE_RATE_FAILURE,
  RESET_CREATE_RATE_REDUCER
} from "./ActionsTypes";

export const rateGeofenceAction = (id, name, rate, description) => {
  return dispatch => {
    dispatch({ type: CREATE_RATE_IS_LOADING });

    var ratesRef = firebase
      .database()
      .ref("rates")
      .child("geofences")
      .child(id);

    var timeStamp = new Date();

    ratesRef
      .push({ id, name, rate, description, timestamp: timeStamp.getTime() })
      .then(value => {
        dispatch({ type: CREATE_RATE_SUCCES });
      })
      .catch(reason => {
        dispatch({ type: CREATE_RATE_FAILURE });
      });
  };
};

export const resetRateReducerAction = () => {
  return dispatch => {
    dispatch({ type: RESET_CREATE_RATE_REDUCER });
  };
};
