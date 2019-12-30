import RNLocation from "react-native-location";

export const requestLocationPermissions = () => {
  return new Promise((resolve, reject) => {
    RNLocation.requestPermission({
      ios: "whenInUse",
      android: {
        detail: "fine"
      }
    })
      .then(granted => {
        if (granted) {
          resolve();
        } else {
          reject();
        }
      })
      .catch(() => reject());
  });
};

export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    RNLocation.getLatestLocation()
      .then(location => resolve(location))
      .catch(() => reject());
  });
};
