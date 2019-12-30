import firebase from "react-native-firebase";
import {
  FETCH_VEHICLE_DETAIL_SUCCESS,
  RESET_VEHICLE_DETAIL_REDUCER,
  FETCH_VEHICLES_SUCCESS,
  FETCH_VEHICLES_IS_LOADING
} from "./ActionsTypes";

import _ from "lodash";

export const getVehicleDetailAction = vehicleId => {
  return dispatch => {
    var vehiclesRef = firebase
      .database()
      .ref("unidades")
      .child(vehicleId);

    vehiclesRef.once("value").then(snapshot => {
      const data = snapshot.val();
      dispatch({ type: FETCH_VEHICLE_DETAIL_SUCCESS, payload: data });
    });
  };
};

export const resetVehicleDetailReducerAction = () => {
  return dispatch => {
    dispatch({ type: RESET_VEHICLE_DETAIL_REDUCER });
  };
};

export const fetchVehiclesAction = () => {
  return dispatch => {
    var vehiclesRef = firebase.database().ref("unidades");
    dispatch({ type: FETCH_VEHICLES_IS_LOADING });
    vehiclesRef.once("value").then(snapshot => {
      const data = snapshot.val();
      const dataArray = _.values(data);
      const vehicles = _.compact(dataArray);
      dispatch({ type: FETCH_VEHICLES_SUCCESS, payload: vehicles });
    });
  };
};
