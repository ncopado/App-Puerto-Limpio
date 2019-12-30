import firebase from "react-native-firebase";
import _ from "lodash";

export const renovateSuscriptionsTopics = suscriptions => {
  _.forEach(suscriptions, sus => {
    if (sus.enabled) {
      firebase.messaging().subscribeToTopic(sus.id);
    }
  });
};

export const suscribeToGeneralTopic = () => {
  firebase.messaging().subscribeToTopic("noticias-generales");
};
