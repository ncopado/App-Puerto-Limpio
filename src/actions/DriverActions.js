import firebase from "react-native-firebase";
import {
  FETCH_DRIVER_DETAIL_SUCCESS,
  RESET_DRIVER_DETAIL_REDUCER,
  FETCH_DRIVERS_SUCCESS,
  FETCH_DRIVERS_IS_LOADING
} from "./ActionsTypes";
import _ from "lodash";

export const getDriverDetailAction = driverId => {
  return dispatch => {
    var driversRed = firebase
      .database()
      .ref("conductores")
      .child(driverId);

    driversRed.once("value").then(snapshot => {
      const data = snapshot.val();
      dispatch({ type: FETCH_DRIVER_DETAIL_SUCCESS, payload: data });
    });
  };
};

export const resetDriverDetailReducerAction = () => {
  return dispatch => {
    dispatch({ type: RESET_DRIVER_DETAIL_REDUCER });
  };
};

export const fetchDriversAction = () => {
  return dispatch => {
    var driversRed = firebase.database().ref("conductores");
    dispatch({ type: FETCH_DRIVERS_IS_LOADING });
    driversRed.once("value").then(snapshot => {
      const data = snapshot.val();
      const drivers = _.compact(data);
      dispatch({ type: FETCH_DRIVERS_SUCCESS, payload: drivers });
    });
  };
};
