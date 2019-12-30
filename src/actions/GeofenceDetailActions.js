import firebase from "react-native-firebase";
import {
  FETCH_GEOFENCE_DETAIL_SUCCES,
  RESET_GEOFENCE_DETAIL_REDUCER
} from "./ActionsTypes";

export const getGeofenceDetailAction = name => {
  return dispatch => {
    var sessionsRef = firebase
      .database()
      .ref("rutas")
      .child(name);

    sessionsRef.once("value").then(snapshot => {
      const data = snapshot.val();
      dispatch({ type: FETCH_GEOFENCE_DETAIL_SUCCES, payload: data });
    });
  };
};

export const resetGeofenceDetailReducerAction = () => {
  return dispatch => {
    dispatch({ type: RESET_GEOFENCE_DETAIL_REDUCER });
  };
};
