import firebase from "react-native-firebase";

export const signupToFB = (email, password) => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => resolve(user))
      .catch(error => {
        const { code } = error;
        reject(code);
      });
  });
};

export const signinToFB = (email, password) => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(_ => resolve())
      .catch(({ code }) => reject(code));
  });
};
