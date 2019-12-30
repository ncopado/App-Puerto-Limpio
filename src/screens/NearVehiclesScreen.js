import React, { Component } from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import {
  fetchVehiclesStatusAction,
  resetVehiclesStatusReducerAction
} from "../actions";
import Loading from "../components/common/Loading";
import NearVehiclesMap from "../components/NearScreen/NearVehiclesMap";
import { Navigation } from "react-native-navigation";
class NearVehiclesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.loadDevicesStatus();
    Navigation.events().bindComponent(this);
  }

  static get options() {
    return {
      topBar: {
        rightButtons: [
          {
            id: "ok",
            text: "Volver"
          }
        ]
      }
    };
  }

  async navigationButtonPressed({ buttonId }) {
    if (buttonId === "ok") {
      this.dismisScreen();
    }
  }

  dismisScreen = () => {
    this.props.resetVehiclesStatusReducerAction();
    Navigation.dismissModal(this.props.componentId);
  };

  loadDevicesStatus = () => {
    const { fetchVehiclesStatusAction } = this.props;
    fetchVehiclesStatusAction();
  };

  render() {
    return <View style={styles.container}>{this.renderMap()}</View>;
  }

  renderMap = () => {
    const { isLoadingDevicesStatus, vehiclesStatus } = this.props;
    if (isLoadingDevicesStatus) {
      return <Loading text="Localizando Camiones..." />;
    } else {
      return (
        <NearVehiclesMap
          vehiclesStatus={vehiclesStatus}
          dismisScreen={this.dismisScreen}
          userLocation={this.props.userLocation}
        />
      );
    }
  };
}

const styles = StyleSheet.create({
  map: {
    backgroundColor: "transparent",
    ...StyleSheet.absoluteFillObject
  },
  container: {
    flex: 1
  }
});

const mapStateToProps = ({ vehiclesStatusReducer }) => {
  let {
    vehiclesStatus,
    isLoadingDevicesStatus,
    vehiclesStatusErrorMessage,
    vehiclesStatusError
  } = vehiclesStatusReducer;

  return {
    vehiclesStatus,
    isLoadingDevicesStatus,
    vehiclesStatusErrorMessage,
    vehiclesStatusError
  };
};

export default connect(
  mapStateToProps,
  {
    fetchVehiclesStatusAction,
    resetVehiclesStatusReducerAction
  }
)(NearVehiclesScreen);
