import firebase from "react-native-firebase";

export const createSuscription = route => {
  let userId = firebase.auth().currentUser.uid;
  var suscriptionRef = firebase
    .database()
    .ref("users")
    .child(userId)
    .child("suscriptions")
    .child("geofences")
    .child(route.id);

  return new Promise((resolve, reject) => {
    firebase.messaging().subscribeToTopic(route.id);
    suscriptionRef
      .set({ name: route.name, id: route.id, enabled: true })
      .then(() => resolve())
      .catch(() => reject());
  });
};

export const verifyIfSuscriptionExists = route => {
  let userId = firebase.auth().currentUser.uid;
  var suscriptionsRef = firebase
    .database()
    .ref("users")
    .child(userId)
    .child("suscriptions")
    .child("geofences");

  return new Promise((resolve, reject) => {
    suscriptionsRef.once("value").then(snapshot => {
      if (snapshot.hasChild(route.id)) {
        reject(`Ya se encuentra suscrito la ruta ${route.name}`);
      } else {
        resolve();
      }
    });
  });
};
