import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet
} from "react-native";
import firebase from "react-native-firebase";
import { LIGHT_GRAY, BLUE_COLOR } from "../constants";
import { Navigation } from "react-native-navigation";
import { connect } from "react-redux";
import Loading from "../components/common/Loading";
import AlerstList from "../components/Alerts/AlertsList";
import { LOADING_SUSCRIPTIONS_MESSAGE } from "../StringValues";

class AlertsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { alerts: [], counter: 0 };
    Navigation.events().bindComponent(this);
    this.createNotificationListeners();
  
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.renderAlertsList()}
      </SafeAreaView>
    );
  }

  renderAlertsList = () => {
    const { loadingSuscriptions, suscriptions } = this.props;
    if (loadingSuscriptions) {
      return <Loading text={LOADING_SUSCRIPTIONS_MESSAGE} />;
    } else {
      return <AlerstList suscriptions={suscriptions} />;
    }
  };

  componentDidUpdate = () => {
    // this.changeNotificationBadge();
  };

  componentDidAppear() {
    // this.resetBadge();
  }

  resetBadge = () => {
    // this.setState({ counter: 0 });
  };

  changeNotificationBadge = () => {
    // const { counter } = this.state;
    // let badeString = `${counter}`;

    // Navigation.mergeOptions(this.props.componentId, {
    //   bottomTab: {
    //     badge: badeString === "0" ? null : badeString
    //   }
    // });
  };

  createNotificationListeners = async () => {
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        const { data } = notification;
        const { isAlert } = data;
        if (isAlert) {
          this.setState(prevState => ({
            counter: prevState.counter + 1
          }));
        }
      });

    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const { notification } = notificationOpen;
        this.handleAlertNotification(notification);
      });

    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const { notification } = notificationOpen;
      this.handleAlertNotification(notification);
    }
  };

  handleAlertNotification = notification => {
    const { data } = notification;
    const { isAlert } = data;
    if (isAlert) {
      Navigation.mergeOptions("LPVTab", {
        bottomTabs: { currentTabIndex: 2 }
      });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: BLUE_COLOR
  }
});

const mapStateToProps = ({ suscriptionsReducer }) => {
  const { suscriptions, loadingSuscriptions } = suscriptionsReducer;
  return { suscriptions, loadingSuscriptions };
};

export default connect(
  mapStateToProps,
  null
)(AlertsScreen);
