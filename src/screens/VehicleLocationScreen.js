import React, { Component } from "react";
import {
  SafeAreaView,
  Platform,
  StyleSheet,
  LayoutAnimation,
  UIManager,
  Text
} from "react-native";
import { Navigation } from "react-native-navigation";
import { connect } from "react-redux";
import {
  fetchDeviceStatusAction,
  resetDeviceStatusReducerAction,
  resetEspecificGeofenceReducerAction,
  resetUserLocationReducerActions
} from "../actions";
import VehicleLocationMap from "../components/VehicleLocation/VehicleLocationMap";
import Loading from "../components/common/Loading";
import { GetCredentials, getLocalGeotabCredentials } from "../AsyncStorage";
import { showOkMessage } from "../AlertMessages";

class VehicleLocationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { renderMap: false };
    Navigation.events().bindComponent(this);
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  static get options() {
    if (Platform.OS === "ios") {
      return {
        topBar: {
          leftButtons: [
            {
              id: "Ok",
              text: "Volver",
              fontFamily: "NeoSans-Medium",
              color: "gray"
            }
          ]
        }
      };
    }
    if (Platform.OS === "android") {
      return {
        topBar: {
          rightButtons: [
            {
              id: "Ok",
              text: "Volver",
              fontFamily: "NeoSans-Medium",
              color: "gray"
            }
          ]
        }
      };
    }
  }

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  navigationButtonPressed({ buttonId }) {
    this.dismissScreen();
  }

  resetReducers = () => {
    this.props.resetEspecificGeofenceReducerAction();
    this.props.resetDeviceStatusReducerAction();
  };

  dismissScreen = () => {
    this.resetReducers();
    Navigation.dismissModal(this.props.componentId);
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>{this.renderMap()}</SafeAreaView>
    );
  }

  renderMap = () => {
    const { isloadingDeviceStatus, deviceStatusError } = this.props;

    if (isloadingDeviceStatus || deviceStatusError) {
      return <Loading text={`Localizando camion`} />;
    } else {
      const { deviceStatus, deviceId } = this.props;
      const { latitude, longitude } = deviceStatus;
      const initialRegion = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      };
      const { geofenceId } = this.props;
      return (
        <VehicleLocationMap
          initialRegion={initialRegion}
          lat={latitude}
          lon={longitude}
          geofenceId={geofenceId}
          deviceId={deviceId}
        />
      );
    }
  };

  componentDidMount = async () => {
    const { deviceId } = this.props;
    try {
      let credentials = await getLocalGeotabCredentials();
      this.props.fetchDeviceStatusAction(deviceId, JSON.parse(credentials));
    } catch (err) {}
  };

  componentDidUpdate = () => {
    this.verifyErrors();
  };

  verifyErrors = () => {
    const { deviceStatusError, deviceStatusErrorMessage } = this.props;
    if (deviceStatusError) {
      showOkMessage(null, deviceStatusErrorMessage, () => {
        this.dismissScreen();
      });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

const mapStateToProps = ({ deviceStatusReducer }) => {
  const {
    deviceStatus,
    isloadingDeviceStatus,
    deviceStatusErrorMessage,
    deviceStatusError
  } = deviceStatusReducer;
  return {
    deviceStatus,
    isloadingDeviceStatus,
    deviceStatusErrorMessage,
    deviceStatusError
  };
};

export default connect(
  mapStateToProps,
  {
    fetchDeviceStatusAction,
    resetDeviceStatusReducerAction,
    resetEspecificGeofenceReducerAction,
    resetUserLocationReducerActions
  }
)(VehicleLocationScreen);
