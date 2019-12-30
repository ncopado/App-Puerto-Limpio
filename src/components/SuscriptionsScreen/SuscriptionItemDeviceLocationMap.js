import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { getLocalGeotabCredentials } from "../../AsyncStorage";
import { connect } from "react-redux";
import { fetchDeviceLocationAction } from "../../actions";
import Loading from "../common/Loading";
import { fetchDeviceLocation } from "../../GeotabApi/GTDeviceLocation";

class SuscriptionItemDeviceLocationMap extends Component {
  constructor(props) {
    super(props);
    const { deviceId } = this.props;
    this.state = { location: null,  timer: null, };
  }

  componentDidMount = async () => {
    this.loadDeviceLocation();
    let timer = setInterval(this.loadDeviceLocation, 10000);
    this.setState({timer});
  };

  render() {
    const { mapHeight } = this.props;
    return (
      <View style={[styles.container, { height: mapHeight }]}>
        {this.renderMap()}
      </View>
    );
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }


  loadDeviceLocation = async () => {
    try {
      const { deviceId } = this.props;
      const credentials = await getLocalGeotabCredentials();
      const data = await fetchDeviceLocation(JSON.parse(credentials), deviceId);
      const { latitude, longitude } = data;

      this.setState({ location: { latitude, longitude } });
    } catch (error) {
      console.log(error);
    }
  };

  renderMap = () => {
    const { location } = this.state;
    if (location === null) {
      return <Loading text="Cargando..." />;
    } else {
      const { latitude, longitude } = location;
      console.log(location);

      return (
        <MapView
          // initialRegion={{
          //   latitude,
          //   longitude,
          //   latitudeDelta: 0.0222,
          //   longitudeDelta: 0.0221
          // }}
          region={{
            latitude,
            longitude,
            latitudeDelta: 0.0122,
            longitudeDelta: 0.0121
          }}
          style={{ flex: 1, borderRadius: 10 }}
          scrollEnabled={false}
          onPress={() => this.loadDeviceLocation()}
        >
          <Marker
            key={"keyt"}
            coordinate={location}
            image={require("../../images/logo_puerto_limpio.png")}
          />
        </MapView>
      );
    }
  };
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    marginHorizontal: 8
  }
});

const mapStateToProps = ({ deviceLocationReducer }) => {
  console.log(deviceLocationReducer);

  return { deviceLocationReducer };
};

export default connect(
  mapStateToProps,
  { fetchDeviceLocationAction }
)(SuscriptionItemDeviceLocationMap);
