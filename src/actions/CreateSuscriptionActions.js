import firebase from "react-native-firebase";
import {
  SUSCRIPTION_CREATE_FAILURE,
  SUSCRIPTION_CREATE_ALREADY_EXISTS,
  SUSCRIPTION_CREATE_SUCCESS,
  RESET_SUSCRIPTION_CREATE_DATA
} from "./ActionsTypes";

export const createSuscriptionAction = geofence => {
  return dispatch => {
    let userId = firebase.auth().currentUser.uid;
    var sessionsRef = firebase
      .database()
      .ref("users")
      .child(userId)
      .child("suscriptions")
      .child("geofences");

    sessionsRef.once("value").then(snapshot => {
      if (snapshot.hasChild(geofence.id)) {
        dispatch({ type: SUSCRIPTION_CREATE_ALREADY_EXISTS });
      } else {
        sessionsRef
          .child(geofence.id)
          .set({ name: geofence.name, id: geofence.id, enabled: true })
          .then(() => {
            firebase.messaging().subscribeToTopic(geofence.id);
            dispatch({ type: SUSCRIPTION_CREATE_SUCCESS });
          });
      }
    });
  };
};

export const resetCreateSuscriptionData = () => {
  return dispatch => {
    dispatch({ type: RESET_SUSCRIPTION_CREATE_DATA });
  };
};
