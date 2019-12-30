import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  LayoutAnimation,
  UIManager,
  AsyncStorage
} from "react-native";
import { showOkMessage } from "../AlertMessages";
import MapView, { Polygon, Marker } from "react-native-maps";
import { connect } from "react-redux";
import {
  getGeofencesAction,
  getUserLocationAction,
  resetUserLocationReducerActions
} from "../actions";
import GeofencePolygon from "./VehicleLocation/GeofencePolygon";
import GeofenceMarker from "./GeofenceMarker";

class ComposeSuscriptionMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAlertActive: false
    };
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    this.checkIfDataExists();
  }
  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  checkIfDataExists = () => {
    const { userCoordinates, geofences } = this.props;

    if (!userCoordinates) {
      this.props.getUserLocationAction();
    }
    if (geofences.length === 0) {
      this.props.getGeofencesAction();
    }
  };

  componentDidUpdate = () => {
    this.checkLocationErrors();
    this.verifyGeofencesErrors();
  };

  checkLocationErrors = () => {
    const {
      locationError,
      geofences,
      dismisScreen,
      resetUserLocationReducerActions
    } = this.props;
    const { isAlertActive } = this.state;
    if (locationError && geofences && !isAlertActive) {
      this.setState({ isAlertActive: true });
      showOkMessage(
        "Error",
        "No pudimos obtener tu ubicación actual,verifica los permisos o tu conexión a internet,y vuelve a intentarlo ",
        () => {
          resetUserLocationReducerActions();
          dismisScreen();
        }
      );
    }
  };

  verifyGeofencesErrors = () => {
    const { geofencesError, geofencesErrorMessage, dismisScreen } = this.props;
    if (geofencesError) {
      showOkMessage(
        "Error al obtener las zonas de limpia publica",
        geofencesErrorMessage,
        () => {
          dismisScreen();
        }
      );
    }
  };

  render = () => {
    return this.renderMap();
  };

  renderMap = () => {
    const { userCoordinates } = this.props;
    if (!userCoordinates) {
      return (
        <View style={styles.loading}>
          <Text style={styles.text}> Obteniendo ubicación ...</Text>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      const { userCoordinates, geofences, onPolygonPress } = this.props;
      const { latitude, longitude } = userCoordinates;

      const userRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      };

      return (
        <MapView
          style={styles.map}
          showsMyLocationButton
          showsUserLocation={true}
          initialRegion={userRegion}
        >
          {geofences.map((geofence, i) => (
            <GeofencePolygon
              key={i}
              geofence={geofence}
              onPress={onPolygonPress}
            />
          ))}
        </MapView>
      );
    }
  };
}

const styles = StyleSheet.create({
  map: {
    backgroundColor: "transparent",
    ...StyleSheet.absoluteFillObject
  },
  loading: {
    flex: 1,
    justifyContent: "center"
  },
  text: {
    alignSelf: "center",
    fontWeight: "800",
    paddingBottom: 16,
    fontSize: 30
  }
});

const mapStateToProps = ({ geofencesReducer, userLocationReducer }) => {
  const {
    userCoordinates,
    locationError,
    locationErrorMessage,
    isLoadingUserLocation
  } = userLocationReducer;
  const {
    geofences,
    isDataLoaded,
    geofencesError,
    geofencesErrorMessage
  } = geofencesReducer;
  return {
    geofences,
    isDataLoaded,
    userCoordinates,
    locationError,
    locationErrorMessage,
    isLoadingUserLocation,
    geofencesError,
    geofencesErrorMessage
  };
};

export default connect(
  mapStateToProps,
  { getGeofencesAction, getUserLocationAction, resetUserLocationReducerActions }
)(ComposeSuscriptionMap);
