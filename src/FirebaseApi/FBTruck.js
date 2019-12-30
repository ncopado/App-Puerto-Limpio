import firebase from "react-native-firebase";

export const fetchTruckData = id => {
  return new Promise((resolve, reject) => {
    let driverRef = firebase
      .database()
      .ref("unidades")
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
