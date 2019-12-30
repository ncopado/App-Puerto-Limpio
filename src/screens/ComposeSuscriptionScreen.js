import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  Text,
  LayoutAnimation,
  UIManager,
  View,
  ActivityIndicator
} from "react-native";
import { Navigation } from "react-native-navigation";
import { connect } from "react-redux";
import {
  createSuscriptionAction,
  resetCreateSuscriptionData,
  resetGeofencesReducerAction
} from "../actions";
import _ from "lodash";
import ComposeSuscriptionMap from "../components/ComposeSuscriptionMap";
import { showOkMessage, showConfirmationAlert } from "../AlertMessages";
import Loading from "../components/common/Loading";

class ComposeSuscriptionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { isCreatingSuscription: false };
    Navigation.events().bindComponent(this);
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  static get options() {
    if (Platform.OS === "ios") {
      return {
        topBar: {
          leftButtons: [
            {
              id: "cancelSuscription",
              text: "Volver",
              fontFamily: "NeoSansPro-Bold",
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
              id: "cancelSuscription",
              text: "Volver",
              fontFamily: "NeoSansPro-Bold",
              color: "gray"
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

  toggleCreatingSuscription = () => {
    this.setState(prevState => ({
      isCreatingSuscription: !prevState.isCreatingSuscription
    }));
  };

  renderMap = () => {
    const { isCreatingSuscription } = this.state;
    if (isCreatingSuscription) {
      return <Loading text={" Creando Suscripción ..."} />;
    } else {
      return (
        <ComposeSuscriptionMap
          onPolygonPress={this._onPolygonPress}
          dismisScreen={this.dismisScreen}
        />
      );
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>{this.renderMap()}</SafeAreaView>
    );
  }

  componentDidUpdate() {
    this.checkIfUserIsSuscribed();
    this.checkIfUserHasCompletedSelection();
  }

  dismisScreen = () => {
    this.resetData();
    Navigation.dismissModal(this.props.componentId);
  };

  resetData = () => {
    this.props.resetCreateSuscriptionData();
    this.props.resetGeofencesReducerAction();
  };

  checkIfUserIsSuscribed() {
    const { suscriptionAlreadyExists } = this.props;
    if (suscriptionAlreadyExists) {
      setTimeout(() => {
        this.showAlreadySuscribedAlert();
      }, 1000);
    }
  }

  showAlreadySuscribedAlert() {
    showOkMessage("Ya te encuentras suscrito a esta zona", null, () => {
      this.resetData();
      this.toggleCreatingSuscription();
    });
  }

  checkIfUserHasCompletedSelection() {
    const { created } = this.props;
    if (created) {
      setTimeout(() => {
        this.showCompletedSelectionAlert();
      }, 1000);
    }
  }

  showCompletedSelectionAlert() {
    showOkMessage("Suscripción realizada con exito", null, () => {
      this.dismisScreen();
    });
  }

  createSuscription = geofence => {
    this.toggleCreatingSuscription();
    this.props.createSuscriptionAction(geofence);
  };

  _onPolygonPress = geofence => {
    let title = `Deseas suscribirte a ${geofence.name} ?`;
    showConfirmationAlert(
      title,
      null,
      this.createSuscription,
      () => {},
      geofence
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
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

const mapStateToProps = ({ createSuscriptionReducer }) => {
  const {
    created,
    createSuscriptionError,
    suscriptionAlreadyExists
  } = createSuscriptionReducer;
  return { created, createSuscriptionError, suscriptionAlreadyExists };
};

export default connect(
  mapStateToProps,
  {
    createSuscriptionAction,
    resetCreateSuscriptionData,
    resetGeofencesReducerAction
  }
)(ComposeSuscriptionScreen);
