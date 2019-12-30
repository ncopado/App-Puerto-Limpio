import React, { Component } from "react";
import { View, Text, SafeAreaView, StyleSheet, Platform } from "react-native";
import { connect } from "react-redux";
import { getGeofencesAction } from "../actions";
import Loading from "../components/common/Loading";
import RoutesMap from "../components/CreateSuscription/RoutesMap";
import {
  verifyIfSuscriptionExists,
  createSuscription
} from "../FirebaseApi/FBCreateSuscription";
import {
  showConfirmationAlert,
  showErrorMessage,
  showOkMessage
} from "../AlertMessages";
import ErrorScreen from "../components/common/ErrorScreen";
import { Navigation } from "react-native-navigation";
class CreateSuscriptionScreen extends Component {
  constructor(props) {
    super(props);

    this.state = { isCreatingSucription: false };
    Navigation.events().bindComponent(this);
    this.fetchRoutes();
  }

  fetchRoutes = () => {
    this.props.getGeofencesAction();
  };

  static get options() {
    if (Platform.OS === "ios") {
      return {
        topBar: {
          leftButtons: [
            {
              id: "cancelSuscription",
              text: "Volver"
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
              id: "cancelSuscription",
              text: "Volver"
            }
          ]
        }
      };
    }
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === "cancelSuscription") {
      this.dismisScreen();
    }
  }

  dismisScreen = () => {
    Navigation.dismissModal(this.props.componentId);
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>{this.renderMap()}</SafeAreaView>
    );
  }

  renderMap = () => {
    const { isLoading, routes, errorDescription, userLocation } = this.props;
    const { isCreatingSucription } = this.state;
    if (isCreatingSucription) {
      return <Loading text="Creando Suscripción" />;
    }

    if (isLoading) {
      return <Loading text="Cargando Rutas" />;
    } else if (routes) {
      return (
        <RoutesMap
          routes={routes}
          onRoutePress={this.handleRoutePress}
          userLocation={userLocation}
        />
      );
    } else if (errorDescription) {
      <ErrorScreen
        title="Error"
        description={errorDescription}
        retyAction={this.fetchRoutes}
      />;
    }
  };

  handleRoutePress = async route => {
    showConfirmationAlert(
      "¿Estas Seguro?",
      `¿Deseas suscribirte a la ruta ${route.name}?`,
      () => this.createSuscriptions(route),
      () => {}
    );
  };

  createSuscriptions = async route => {
    this.setState({ isCreatingSucription: true });
    try {
      await verifyIfSuscriptionExists(route);
      await createSuscription(route);
      showOkMessage("Suscripción Realizada con éxito", null, () =>
        this.dismisScreen()
      );
    } catch (error) {
      showErrorMessage(error);
    }

    this.setState({ isCreatingSucription: false });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    backgroundColor: "transparent",
    ...StyleSheet.absoluteFillObject
  }
});

const mapStateToProps = ({ routesReducer }) => {
  const { isLoading, routes, errorDescription } = routesReducer;
  return { isLoading, routes, errorDescription };
};

const mapDispatchToProps = { getGeofencesAction };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateSuscriptionScreen);
