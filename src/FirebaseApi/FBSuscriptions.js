import firebase from "react-native-firebase";

export const fetchUserSuscriptions = completion => {
  let userId = firebase.auth().currentUser.uid;
  console.log(userId);
  
  var sessionsRef = firebase
    .database()
    .ref("users")
    .child(userId)
    .child("suscriptions")
    .child("geofences");
  sessionsRef.on("value", completion);
};

