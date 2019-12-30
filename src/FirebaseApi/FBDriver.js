import firebase from "react-native-firebase";

export const fetchDriverData = id => {
  return new Promise((resolve, reject) => {
    let driverRef = firebase
      .database()
      .ref("conductores")
      .child(id);

    driverRef.once("value", snapshot => {
      let data = snapshot.val();
      if (data) {
        resolve(data);
      } else {
        reject();
      }
    });
  });
};
