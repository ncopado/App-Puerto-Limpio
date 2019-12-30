import firebase from "react-native-firebase";
import _ from "lodash";
import {
  FETCH_ALERTS_SUCCESFULL,
  FETCH_ALERTS_IS_LOADING
} from "./ActionsTypes";

export const fetchAlertsActions = suscriptions => {
  return dispatch => {
    dispatch({ type: FETCH_ALERTS_IS_LOADING });
    var alertsRef = firebase.database().ref("notificaciones");
    alertsRef.on("value", snapshot => {
      let notifications = snapshot.val();
      if (notifications) {
        let matchedNotifications = matchNotificationsWithSuscriptions(
          notifications,
          suscriptions
        );
        dispatch({
          type: FETCH_ALERTS_SUCCESFULL,
          payload: matchedNotifications
        });
      } else {
        dispatch({
          type: FETCH_ALERTS_SUCCESFULL,
          payload: []
        });
      }
    });
  };
};

const matchNotificationsWithSuscriptions = (notifications, suscriptions) => {
  var matches = [];
  _.map(suscriptions, suscription => {
    const geofenceId = suscription.id;
    const matchedtNotifications = notifications[geofenceId];

    if (matchedtNotifications) {
      _.forEach(matchedtNotifications, mn => {
        matches.push(mn);
      });
    }
  });

  var generalNotifications = notifications["noticias-generales"];
  _.forEach(generalNotifications, notification => {
    matches.push(notification);
  });

  const orderedMatches = _.orderBy(matches, ["timestamp"], ["desc"]);

  return orderedMatches;
};
