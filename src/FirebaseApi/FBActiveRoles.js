import firebase from "react-native-firebase";

export const fetchActiveRoleForSuscription = suscriptionId => {
  let activeRoleRef = firebase
    .database()
    .ref("horarioActivo")
    .child(suscriptionId);

  return new Promise((resolve, reject) => {
    activeRoleRef.once("value", snapshot => {
      let data = snapshot.val();
      if (data) {
        resolve(data);
      } else {
        reject();
      }
    });
  });
};
