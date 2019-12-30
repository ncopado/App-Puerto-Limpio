import firebase from "react-native-firebase";

export const createUserData = (uid, data) => {
  const { name, email, lastname } = data;
  var usersRef = firebase.database().ref("users");
  return new Promise((resolve, reject) => {
    usersRef
      .child(uid)
      .child("data")
      .set({ name, email, lastname })
      .then(_ => resolve())
      .catch(error => {
        const { code } = error;
        reject(code);
      });
  });
};
