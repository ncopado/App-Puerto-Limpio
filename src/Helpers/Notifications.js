import firebase from "react-native-firebase";
import { getFirebaseToken, setFirebaseToken } from "../AsyncStorage";
export const deviceHasNotificationsPermission = async () => {
  return new Promise(function(resolve, reject) {
    firebase
      .messaging()
      .hasPermission()
      .then(permission => {
        if (permission) {
          resolve();
        } else {
          reject();
        }
      });
  });
};

export const requestNotificationPermissions = async () => {
  return new Promise(function(resolve, reject) {
    firebase
      .messaging()
      .requestPermission()
      .then(() => {
        resolve();
      })
      .catch(() => {
        reject();
      });
  });
};

export const fetchTokenFromFirebase = async () => {
  return new Promise(function(resolve, reject) {
    firebase
      .messaging()
      .getToken()
      .then(value => {
        resolve(value);
      })
      .catch(reason => {
        reject(reason);
      });
  });
};

export default class fcmTokenManager {
  verifyLocalToken = async () => {
    const token = await getFirebaseToken();

    if (token === null) {
      this.fetchToken();
    }
  };

  fetchToken = async () => {
    try {
      const token = await fetchTokenFromFirebase();

      await setFirebaseToken(token);
    } catch (error) {}
  };
}

// fZ3_LmjggXg:APA91bHIKqmwnljwGdv2CP6QPmXkNPBgdUUb57s0gLwUCe62pXyrVEMhwR0oPkF7MqrJJ9DKC9CSaG10e42o6j-9LZwZ9Nk7lsBQHql3ejRK_YUf1EoVZeFWRo0i4oJwTA33QwJnS_gi
