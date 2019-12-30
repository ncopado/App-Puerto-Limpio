import firebase from "react-native-firebase";
import {
  CHANGE_SUSCRIPTION_IS_LOADING,
  CHANGE_SUSCRIPTION_SUCCESS,
  CHANGE_SUSCRIPTION_FAILURE
} from "./ActionsTypes";

export const changeSuscriptionstatusAction = (geofenceId, enabled) => {
  return dispatch => {
    dispatch({ type: CHANGE_SUSCRIPTION_IS_LOADING });
    let userId = firebase.auth().currentUser.uid;
    var geofenceStatusRef = firebase
      .database()
      .ref("users")
      .child(userId)
      .child("suscriptions")
      .child("geofences")
      .child(geofenceId);
    geofenceStatusRef
      .update({ enabled })
      .then(value => {
        dispatch({ type: CHANGE_SUSCRIPTION_SUCCESS });
      })
      .catch(reason => {
        dispatch({ type: CHANGE_SUSCRIPTION_FAILURE });
      });
  };
};
