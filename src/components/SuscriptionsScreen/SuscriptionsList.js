import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  UIManager,
  SectionList,
  View,
  Text,
  Dimensions,
  Linking,
  RefreshControl
} from "react-native";
import SuscriptionItem from "./SuscriptionItem";
import { APPLE_BLUE_COLOR, BLUE_COLOR } from "../../constants";
import _ from "lodash";
import firebase from "react-native-firebase";
import { connect } from "react-redux";
import { StartSuscriptionsListenerAction } from "../../actions";
import Loading from "../common/Loading";
import { LOADING_SUSCRIPTIONS_MESSAGE } from "../../StringValues";
import MapView from "react-native-maps";
import NearVehiclesItem from "./NearVehiclesItem";

class SuscriptionsList extends Component {
  constructor(props) {
    super(props);
    this.state = { refreshing: false, isScreenPresented: false };
    this.startSuscriptionsListener();
  }

  startSuscriptionsListener = () => {
    this.props.StartSuscriptionsListenerAction();
  };

  render() {
    return this.renderList();
  }

  calculateMapSize = numberOfItems => {
    const screenHeight = Math.round(Dimensions.get("window").height);

    switch (numberOfItems) {
      case 1:
        return screenHeight * 0.45;
      default:
        return screenHeight * 0.25;
    }

    // const size = screenHeight / numberOfItems;
    // return size;
  };

  renderList = () => {
    const { loadingSuscriptions, suscriptions } = this.props;

    const renderItem = ({ item, index, section: { title, data } }) => (
      <View
        style={{
          backgroundColor: "white",
          padding: 8,
          margin: 8,
          borderRadius: 5
        }}
      >
        <Text style={styles.titleText}>
          <Text>
            Te damos la bienvenida a la aplicación Puerto Limpio versión beta,
            cuéntanos tu experiencia y sugerencias{" "}
            <Text
              onPress={() =>
                Linking.openURL("mailto:dmiga@veracruzmunicipio.gob.mx")
              }
              style={{ color: BLUE_COLOR }}
            >
              dmiga@veracruzmunicipio.gob.mx
            </Text>
          </Text>
        </Text>
      </View>
    );

    if (loadingSuscriptions) {
      return <Loading text={LOADING_SUSCRIPTIONS_MESSAGE} />;
    } else {
      const mapHeight = this.calculateMapSize(suscriptions.length);
      return (
        <SectionList
          style={styles.flatList}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          renderItem={({ item }) => (
            <SuscriptionItem
              key={item.id}
              suscription={item}
              onButtonPress={this.props.onSuscriptionItemButtonPressed}
              mapHeight={mapHeight}
            />
          )}
          sections={[
            {
              title: "Section Head For Data C",
              data: ["1"],
              renderItem: renderItem
            },
            {
              title: "Title1",
              data: suscriptions
            }
          ]}
        />
      );
    }
  };

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.StartSuscriptionsListenerAction();

    this.setState({ refreshing: false });
  };

  componentDidUpdate = () => {
    this.checkIfUserHasSuscriptions();
  };

  checkIfUserHasSuscriptions = () => {
    let { suscriptions } = this.props;
    let { isScreenPresented } = this.state;
    if (suscriptions.length === 0 && !isScreenPresented) {
      this.setState({ isScreenPresented: true });
      this.props.createNewSuscription();
    }
  };

  unsubscribe = () => {
    const { suscriptions } = this.props;
    _.forEach(suscriptions, sus => {
      if (sus.enabled) {
        firebase.messaging().unsubscribeFromTopic(sus.id);
      }
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: "60%",
    alignItems: "center"
  },
  flatList: {
    flexGrow: 1
  },
  emptyDescription: {
    alignSelf: "center"
  },
  titleText: {
    fontSize: 10,
    fontFamily: "NeoSansPro-Bold",
    color: "gray"
  },
  emptyItemButton: {
    borderColor: APPLE_BLUE_COLOR,
    color: APPLE_BLUE_COLOR,
    borderRadius: 5,
    borderWidth: 1,
    padding: 4,
    marginTop: 8,
    fontSize: 18
  }
});

const mapStateToProps = ({ suscriptionsReducer }) => {
  const { suscriptions, loadingSuscriptions } = suscriptionsReducer;

  return { suscriptions, loadingSuscriptions };
};

export default connect(
  mapStateToProps,
  {
    StartSuscriptionsListenerAction
  }
)(SuscriptionsList);
