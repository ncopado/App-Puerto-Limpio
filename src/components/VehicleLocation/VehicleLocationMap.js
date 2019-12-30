import React, { Component } from "react";
import { StyleSheet, AsyncStorage } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { showOkMessage } from "../../AlertMessages";
import { getDistanceSimple } from "geolib";
import UserDistancePolyLine from "./UserDistancePolyLine";
import { connect } from "react-redux";
import {
  getEspecificGeofenceAction,
  getUserLocationAction
} from "../../actions";
import GeofencePolygon from "./GeofencePolygon";
import firebase from "react-native-firebase";
import { getLocalGeotabCredentials } from "../../AsyncStorage";

class VehicleLocationMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      description: null,
      isAlertActive: false
    };
    this.getGeofence();
    this.getUserLocation();
    this.getVehicleName();
  }

  getGeofence = async () => {
    const { geofenceId } = this.props;

    let credentials = await getLocalGeotabCredentials();

    this.props.getEspecificGeofenceAction(geofenceId, JSON.parse(credentials));
  };

  getUserLocation = () => {
    const { userCoordinates } = this.props;
    if (!userCoordinates) {
      this.props.getUserLocationAction();
    }
  };

  getVehicleName = () => {
    const { deviceId } = this.props;
    var driverRef = firebase
      .database()
      .ref("unidades")
      .child(deviceId);

    driverRef.once("value").then(snap => {
      let data = snap.val();
      let title = data.nombre;
      this.setState({ title });
    });
  };

  render() {
    const { initialRegion, lat, lon } = this.props;
    const latitude = lat;
    const longitude = lon;
    const { title, description } = this.state;

    return (
      <MapView
        style={styles.map}
        showsMyLocationButton
        showsUserLocation={true}
        initialRegion={initialRegion}
      >
        <Marker
          coordinate={{ latitude, longitude }}
          title={title ? title : "Cargando"}
          description={description ? description : "Cargando"}
          image={require("../../images/logo_puerto_limpio.png")}
        />
        {this.renderGeofence()}
        {this.renderPolilyne()}
      </MapView>
    );
  }

  renderGeofence = () => {
    const { geofence } = this.props;
    if (geofence) {
      return <GeofencePolygon geofence={geofence} onPress={() => {}} />;
    }
  };

  renderPolilyne = () => {
    const { lat, lon, userCoordinates } = this.props;
    const vehiclePosition = { lat, lon };
    if (userCoordinates) {
      return (
        <UserDistancePolyLine
          vehiclePosition={vehiclePosition}
          userPosition={userCoordinates}
        />
      );
    }
  };

  componentDidUpdate = () => {
    this.calculateDistance();
    this.checkLocationErrors();
  };

  checkLocationErrors = () => {
    const { geofence, locationError, isLoadingUserLocation } = this.props;
    const { isAlertActive } = this.state;
    if (locationError && geofence && !isLoadingUserLocation && !isAlertActive) {
      this.setState({ isAlertActive: true });
      showOkMessage(
        "Error",
        "No pudimos obtener tu ubicación actual,verifica los permisos o tu conexión a internet,y vuelve a intentarlo ",
        () => {}
      );
    }
  };

  calculateDistance = () => {
    const { userCoordinates, lat, lon } = this.props;
    const { description } = this.state;
    if (userCoordinates && !description) {
      const a = geolib.getDistanceSimple(
        { latitude: lat, longitude: lon },
        {
          latitude: userCoordinates.latitude,
          longitude: userCoordinates.longitude
        }
      );

      let distanceString = `A ${a / 1000} km de distancia`;
      this.setState({ description: distanceString });
    }
  };
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

const mapStateToProps = ({ especificGeofenceReducer, userLocationReducer }) => {
  const { geofence } = especificGeofenceReducer;
  const {
    userCoordinates,
    locationError,
    locationErrorMessage,
    isLoadingUserLocation
  } = userLocationReducer;
  return {
    geofence,
    userCoordinates,
    locationError,
    locationErrorMessage,
    isLoadingUserLocation
  };
};

export default connect(
  mapStateToProps,
  {
    getEspecificGeofenceAction,
    getUserLocationAction
  }
)(VehicleLocationMap);
