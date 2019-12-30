import { AsyncStorage } from "react-native";

const CREDENTIALS_FILE_NAME = "credentials";

export const GetCredentials = async () => {
  return new Promise(function(resolve, reject) {
    AsyncStorage.getItem(CREDENTIALS_FILE_NAME)
      .then(credentials => {
        if (credentials) {
          resolve(credentials);
        } else {
          reject();
        }
      })
      .catch(reason => {
        reject();
      });
  });
};

export const RemoveCredentials = async () => {
  return new Promise(function(resolve, reject) {
    AsyncStorage.removeItem("credentials")
      .then(() => {
        resolve();
      })
      .catch(reason => {
        reject(reason);
      });
  });
};

export const getLocalGeotabCredentials = async () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("GTCredentials")
      .then(value => {
        value === null ? reject() : resolve(value);
      })
      .catch(_reason => reject());
  });
};

export const setLocalGeotabCredentials = async GTCredentials => {
  return new Promise((resolve, reject) => {
    AsyncStorage.setItem("GTCredentials", JSON.stringify(GTCredentials))
      .then(() => resolve())
      .catch(_reason => reject());
  });
};

export const setLastGTLogin = () => {
  return new Promise((resolve, reject) => {
    let time = new Date().getTime();
    AsyncStorage.setItem("lastGTLogin", time.toString())
      .then(_value => resolve())
      .catch(_reason => reject());
  });
};

export const getLastGTLogin = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("lastGTLogin")
      .then(value => {
        value === null ? reject() : resolve(value);
      })
      .catch(_reason => reject());
  });
};

export const setFirstLaunch = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.setItem("firstLaunch", "launched")
      .then(() => resolve())
      .catch(() => reject());
  });
};

export const getFirstLaunch = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("firstLaunch")
      .then(value => {
        if (value) {
          resolve(value);
        } else {
          reject();
        }
      })
      .catch(() => reject());
  });
};

export const removeFirtLaunch = async () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.removeItem("firstLaunch")
      .then(() => {
        resolve();
      })
      .catch(reason => {
        reject(reason);
      });
  });
};

export const getFirebaseToken = async () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("fcmToken")
      .then(token => {
        resolve(token);
      })
      .catch(reason => {
        reject(reason);
      });
  });
};

export const removeFirebaseToken = async () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.removeItem("fcmToken")
      .then(() => {
        resolve();
      })
      .catch(reason => {
        reject(reason);
      });
  });
};

export const setFirebaseToken = async token => {
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
