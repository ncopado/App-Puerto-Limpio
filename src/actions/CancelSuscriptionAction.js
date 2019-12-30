import firebase from "react-native-firebase";
import {
  SUSCRIPTION_CANCELATION_FAILURE,
  SUSCRIPTION_CANCELATION_SUCCESS,
  RESET_SUSCRIPTION_CANCELATION_REDUCER
} from "./ActionsTypes";

export const cancelSuscriptionAction = suscription => {
  return dispatch => {
    let userId = firebase.auth().currentUser.uid;
    var sessionsRef = firebase
      .database()
      .ref("users")
      .child(userId)
      .child("suscriptions")
      .child("geofences")
      .child(suscription.id);

    sessionsRef.remove(error => {
      if (error) {
        dispatch({ type: SUSCRIPTION_CANCELATION_FAILURE });
      } else {
        firebase.messaging().unsubscribeFromTopic(suscription.id);
        dispatch({ type: SUSCRIPTION_CANCELATION_SUCCESS });
      }
    });
  };
};

export const resetCancelSuscriptionReducerAction = () => {
  return dispatch => {
    dispatch({ type: RESET_SUSCRIPTION_CANCELATION_REDUCER });
  };
};
