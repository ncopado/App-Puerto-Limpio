import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Alert,
  UIManager,
  View
} from "react-native";
import { LIGHT_GRAY, LIME_GREEN_COLOR } from "../constants";
import firebase from "react-native-firebase";
import { Navigation } from "react-native-navigation";
import { connect } from "react-redux";
import { authenticateToGeoTabAction } from "../actions";
import SuscriptionsList from "../components/SuscriptionsScreen/SuscriptionsList";
import _ from "lodash";
import MapView, { Marker } from "react-native-maps";
import {
  presentComposeSuscriptionScreen,
  presentNearScreen
} from "../navigation";
import Loading from "../components/common/Loading";
import InitializingError from "../components/InitializingError";
import { INITIALIZING_APP_MESSAGE } from "../StringValues";
import {
  requestLocationPermissions,
  getUserLocation
} from "../Helpers/UserLocation";
import { showOkMessage } from "../AlertMessages";
import firebse from "react-native-firebase";
const COMPOSE = "compose";
const NEAR = "near";

class SuscriptionsScreen extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
    this.authToGeotab();
    this.state = { showMap: true };
  }

  static get options() {
    return {
      topBar: {
        rightButtons: [
          {
            id: COMPOSE,
            text: "Crear Suscripción",
            color: "gray"
          }
        ],
        leftButtons: [
          {
            id: NEAR,
            icon: require("../icons/map.png"),
            color: "gray"
          }
        ]
      }
    };
  }


  authToGeotab = () => {
    this.props.authenticateToGeoTabAction();
  };

  navigationButtonPressed = async ({ buttonId }) => {
    if (buttonId === COMPOSE) {
      this.showComposeSuscriptionScreen();
    }
    if (buttonId === NEAR) {
      this.showNearScreen();
    }
  };

  showNearScreen = async () => {
    try {
      await requestLocationPermissions();
      const userLocation = await getUserLocation();

      if (userLocation === null) {
        showOkMessage(
          "Error",
          "Para usar esta función le pedimos por favor,active su servicio de ubicación",
          () => {}
        );
      } else {
        presentNearScreen(userLocation);
      }
    } catch (error) {
      showOkMessage(
        "Error",
        "Necesitamos nos permitas acceder a tu ubicación",
        () => {}
      );
    }
  };

  showComposeSuscriptionScreen = async () => {
    try {
      await requestLocationPermissions();
      const userLocation = await getUserLocation();
      if (userLocation === null) {
        showOkMessage(
          "Error",
          "Para usar esta función le pedimos por favor,active su servicio de ubicación",
          () => {}
        );
      } else {
        presentComposeSuscriptionScreen(userLocation);
      }
    } catch (error) {
      showOkMessage(
        "Error",
        "Necesitamos nos permitas acceder a tu ubicación",
        () => {}
      );
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.renderSuscriptionsList()}
        {/* {this.renderMap()} */}
      </SafeAreaView>
    );
  }

  renderMap = () => {
    const { showMap } = this.state;
    if (showMap) {
      return (
        <View
          style={{
            position: "relative",
            margin: 8,
            height: 180,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
            backgroundColor: "white"
          }}
        >
          <MapView style={{ flex: 1, borderRadius: 10 }} />
        </View>
      );
    }
  };

  renderSuscriptionsList = () => {
    const { geotabAuthIsLoading, geotabAuthError } = this.props;
    if (geotabAuthIsLoading) {
      return <Loading text={INITIALIZING_APP_MESSAGE} />;
    } else if (!geotabAuthError) {
      return (
        <SuscriptionsList
          createNewSuscription={this.showComposeSuscriptionScreen}
        />
      );
    } else {
      return <InitializingError onRetryPress={this.authToGeotab} />;
    }
  };

  componentDidMount = () => {
    this.createNotificationListeners();
  };

  createNotificationListeners = async () => {
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        this.handleNotification(notification);
      });
  };

  handleNotification = notification => {
    const { data } = notification;
    const { vehicleName, geofenceName } = data;
    if (vehicleName && geofenceName) {
      Alert.alert(
        `El ${vehicleName} ya se encuentra en camino a ${geofenceName}`
      );
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIME_GREEN_COLOR
  }
});

const mapStateToProps = ({ GeoTabAuthReducer }) => {
  const { geotabAuthIsLoading, geotabAuthError } = GeoTabAuthReducer;
  return { geotabAuthIsLoading, geotabAuthError };
};

export default connect(
  mapStateToProps,
  {
    authenticateToGeoTabAction
  }
)(SuscriptionsScreen);
