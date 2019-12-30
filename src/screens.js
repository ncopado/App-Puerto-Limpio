import { Navigation } from "react-native-navigation";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import SignInScreen from "./screens/SignInScreen";
import Initializing from "./screens/Initializing";
import SignUpScreen from "./screens/SignUpScreen";
import SuscriptionsScreen from "./screens/SuscriptionsScreen";
import ComposeSuscriptionScreen from "./screens/ComposeSuscriptionScreen";
import SuscriptionSettingScreen from "./screens/SuscriptionSettingScreen";
import VehicleLocationScreen from "./screens/VehicleLocationScreen";
import TeamScreen from "./screens/TeamScreen";
import AlertsScreen from "./screens/AlertsScreen";
import ComposeRateScreen from "./screens/ComposeRateScreen";
import TipsScreen from "./screens/TipsScreen";
import NearVehiclesScreen from "./screens/NearVehiclesScreen";
import MoreScreen from "./screens/MoreScreen";
import CreateSuscriptionScreen from "./screens/CreateSuscriptionScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import RequestNotificationPermissionsScreen from "./screens/RequestNotificationPermissionsScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";

export function registerScreens() {
  const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

  Navigation.registerComponentWithRedux(
    "SignIn",
    () => SignInScreen,
    Provider,
    store
  );

  Navigation.registerComponentWithRedux(
    "More",
    () => MoreScreen,
    Provider,
    store
  );

  Navigation.registerComponentWithRedux(
    "NearVehicles",
    () => NearVehiclesScreen,
    Provider,
    store
  );

  Navigation.registerComponentWithRedux(
    "ComposeRate",
    () => ComposeRateScreen,
    Provider,
    store
  );

  Navigation.registerComponentWithRedux(
    "Tips",
    () => TipsScreen,
    Provider,
    store
  );

  Navigation.registerComponentWithRedux(
    "Team",
    () => TeamScreen,
    Provider,
    store
  );

  Navigation.registerComponentWithRedux(
    "Alerts",
    () => AlertsScreen,
    Provider,
    store
  );

  Navigation.registerComponentWithRedux(
    "VehicleLocation",
    () => VehicleLocationScreen,
    Provider,
    store
  );

  Navigation.registerComponentWithRedux(
    "SuscriptionSetting",
    () => SuscriptionSettingScreen,
    Provider,
    store
  );

  Navigation.registerComponentWithRedux(
    "DeviceLocationScreen",
    () => DeviceLocationScreen,
    Provider,
    store
  );

  Navigation.registerComponentWithRedux(
    "SignUp",
    () => SignUpScreen,
    Provider,
    store
  );

  Navigation.registerComponentWithRedux(
    "Suscriptions",
    () => SuscriptionsScreen,
    Provider,
    store
  );

  Navigation.registerComponentWithRedux(
    "ComposeSuscription",
    () => ComposeSuscriptionScreen,
    Provider,
    store
  );

  Navigation.registerComponentWithRedux(
    "Initializing",
    () => Initializing,
    Provider,
    store
  );

  Navigation.registerComponentWithRedux(
    "CreateSuscription",
    () => CreateSuscriptionScreen,
    Provider,
    store
  );

  Navigation.registerComponentWithRedux(
    "Onboarding",
    () => OnboardingScreen,
    Provider,
    store
  );

  Navigation.registerComponentWithRedux(
    "RequestNotificationPermissions",
    () => RequestNotificationPermissionsScreen,
    Provider,
    store
  );

  Navigation.registerComponentWithRedux(
    "ResetPassword",
    () => ResetPasswordScreen,
    Provider,
    store
  );


}
