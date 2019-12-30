import { Navigation } from "react-native-navigation";
import { registerScreens } from "./src/screens";
import RNLocation from 'react-native-location';

RNLocation.configure({
  distanceFilter: 100, // Meters
  desiredAccuracy: {
    ios: "best",
    android: "balancedPowerAccuracy"
  },
  // Android only
  androidProvider: "auto",
  interval: 5000, // Milliseconds
  fastestInterval: 10000, // Milliseconds
  maxWaitTime: 5000, // Milliseconds
  // iOS Only
  activityType: "other",
  allowsBackgroundLocationUpdates: false,
  headingFilter: 1, // Degrees
  headingOrientation: "portrait",
  pausesLocationUpdatesAutomatically: false,
  showsBackgroundLocationIndicator: false,
})

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: "Initializing"
      }
    }
  });
});