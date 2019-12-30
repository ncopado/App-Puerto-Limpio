import firebase from "react-native-firebase";
import { AsyncStorage } from "react-native";
export const deviceHasPermission = async () => {
  return new Promise(function(resolve, reject) {
    firebase
      .messaging()
      .hasPermission()
      .then(permission => {
        resolve(permission);
      })
      .catch(reason => {
        reject(reason);
      });
  });
};

export const getToken = async () => {
  return new Promise(function(resolve, reject) {
    AsyncStorage.getItem("fcmToken")
      .then(token => {
        resolve(token);
      })
      .catch(reason => {
        reject(reason);
      });
  });
};

export const removeToken = async () => {
  return new Promise(function(resolve, reject) {
    AsyncStorage.removeItem("fcmToken")
      .then(() => resolve())
      .catch(reason => reject());
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

export const saveTokenFromFirebase = async token => {
  return new Promise(function(resolve, reject) {
    AsyncStorage.setItem("fcmToken", token)
      .then(value => {
        resolve();
      })
      .catch(reasion => {
        reject();
      });
  });
};

export const requestNotificationPermissions = async () => {
  return new Promise(function(resolve, reject) {
    firebase
      .messaging()
      .requestPermission()
      .then(permission => {
        resolve(permission);
      })
      .catch(reason => {
        reject(reason);
      });
  });
};

export const getUserLocation = async () => {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      position => {
        resolve(position);
      },
      error => {
        reject(error);
      },
      {
        enableHighAccuracy: false,
        timeout: 20000,
        maximumAge: 1000
      }
    );
  });
};
