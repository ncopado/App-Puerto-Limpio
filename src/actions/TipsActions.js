import firebase from "react-native-firebase";
import { FETCH_TIPS_IS_LOADING, FETCH_TIPS_SUCCESFULL } from "./ActionsTypes";

import _ from "lodash";
export const fetchTipsAction = () => {
  return dispatch => {
    dispatch({ type: FETCH_TIPS_IS_LOADING });
    var alertsRef = firebase.database().ref("tips");
    alertsRef.on("value", snapshot => {
      var tips = snapshot.val();
     

      tips = _.toArray(tips);
      
      dispatch({ type: FETCH_TIPS_SUCCESFULL, payload: tips });
    });
  };
};
