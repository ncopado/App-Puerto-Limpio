import {
  FECTH_SUSCRIPTIONS_SUCCESS,
  FETCH_SUSCRIPTIONS_IS_LOADING
} from "./ActionsTypes";
import _ from "lodash";
import { fetchUserSuscriptions } from "../FirebaseApi/FBSuscriptions";
import {
  renovateSuscriptionsTopics,
  suscribeToGeneralTopic
} from "../FirebaseApi/FBNotificationsTopics";

export const StartSuscriptionsListenerAction = () => {
  return dispatch => {
    suscribeToGeneralTopic();
    dispatch({ type: FETCH_SUSCRIPTIONS_IS_LOADING });

    const completionHandler = snapshot => {
      console.log("SUSCRIPTIONS COMPLETION HANDLE ACTIVAED");
      
      const data = snapshot.val();
      const suscriptions = _.toArray(data);
      console.log(suscriptions);
      
      renovateSuscriptionsTopics(suscriptions);
      dispatch({ type: FECTH_SUSCRIPTIONS_SUCCESS, payload: suscriptions });
    };

    fetchUserSuscriptions(completionHandler);
  };
};

export const setLoadingSuscriptionsAction = () => {
  return dispatch => {
    dispatch({ type: FETCH_SUSCRIPTIONS_IS_LOADING });
  };
};
