import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Button,
  ActivityIndicator,
  Platform
} from "react-native";
import { Navigation } from "react-native-navigation";
import { connect } from "react-redux";
import { rateGeofenceAction, resetRateReducerAction } from "../actions";
import { showOkMessage } from "../AlertMessages";
import ComposeRateForm from "../components/ComposeRate/ComposeRateForm";
import {
  BACK_BUTTON_TITLE,
  RATE_SUBMITTED_SUCCESSFULLY,
  COMPOSE_RATE_SUBMIT_BUTTON_TITLE
} from "../StringValues";

const CANCEL_RATE = "CANCEL_RATE";

class ComposeRateScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "", rating: 5 };
    Navigation.events().bindComponent(this);
  }

  static get options() {
    let backButton = {
      id: CANCEL_RATE,
      text: BACK_BUTTON_TITLE,
      fontFamily: "NeoSans-Medium",
      color: "gray"
    };
    return {
      topBar:
        Platform.OS === "android"
          ? { rightButtons: [backButton] }
          : { leftButtons: [backButton] }
    };
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === CANCEL_RATE) {
      this.dismissModal();
    }
  }

  dismissModal = () => {
    Navigation.dismissModal(this.props.componentId);
    this.props.resetRateReducerAction();
  };

  onFinishRating = rating => {
    this.setState({ rating });
  };

  onChangeText = text => {
    this.setState({ text });
  };

  render() {
    let { text } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => Keyboard.dismiss()}
          style={{ margin: 8, justifyContent: "space-around" }}
        >
          <ComposeRateForm
            text={text}
            onChangeText={this.onChangeText}
            onFinishRating={this.onFinishRating}
          />
        </TouchableOpacity>
        {this.renderButton()}
      </SafeAreaView>
    );
  }

  componentDidUpdate = () => {
    let { created, error } = this.props;
    if (created && !error) {
      this.showSuccessfullRateCreation();
    }
  };

  showSuccessfullRateCreation() {
    showOkMessage(null, RATE_SUBMITTED_SUCCESSFULLY, this.dismissModal);
  }

  renderButton = () => {
    let { createRateIsLoading } = this.props;
    if (createRateIsLoading) {
      return <ActivityIndicator />;
    } else {
      return (
        <Button
          title={COMPOSE_RATE_SUBMIT_BUTTON_TITLE}
          style={{ fontFamily: "NeoSans-Medium", color: "gray" }}
          onPress={this.subbmitRate}
        />
      );
    }
  };

  subbmitRate = () => {
    const { geofenceName, geofenceId } = this.props;
    const { text, rating } = this.state;
    this.props.rateGeofenceAction(geofenceId, geofenceName, rating, text);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 8,
    backgroundColor: "white",
    justifyContent: "flex-start"
  },
  description: {
    fontSize: 35,
    fontWeight: "800",
    color: "gray",
    fontFamily: "NeoSansPro-Bold"
  }
});

const mapStateToProps = ({ createRateReducer }) => {
  const { created, error, createRateIsLoading } = createRateReducer;
  return { created, error, createRateIsLoading };
};

export default connect(
  mapStateToProps,
  {
    rateGeofenceAction,
    resetRateReducerAction
  }
)(ComposeRateScreen);
