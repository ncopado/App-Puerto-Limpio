import React, { Component } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Pages } from "react-native-pages";
import DriversPages from "../components/Teams/DriversPage";
import VehiclesPage from "../components/Teams/VehiclesPage";

import { connect } from "react-redux";
import { fetchDriversAction, fetchVehiclesAction } from "../actions";

import SegmentControl from "react-native-segment-controller";
import { APPLE_BLUE_COLOR, LIGHT_GRAY } from "../constants";

class TeamScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedTabIndex: 0 };
    this.props.fetchDriversAction();
    this.props.fetchVehiclesAction();
  }

  render() {
    const { driversReducer, vehiclesReducer } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.segContainer}>
          <SegmentControl
            values={["Conductores", "Camiones"]}
            selectedIndex={this.state.selectedTabIndex}
            onTabPress={this.changePage}
            height={30}
            activeTabStyle={styles.selectedSegmentControlStyle}
            tabStyle={styles.segmentControlStyle}
            borderRadius={5}
          />
        </View>
        <Pages
          ref="child"
          indicatorColor="black"
          style={styles.container}
          onScrollEnd={this.changePage}
          indicatorPosition="none"
        >
          <DriversPages reducer={driversReducer} />
          <VehiclesPage reducer={vehiclesReducer} />
        </Pages>
      </SafeAreaView>
    );
  }

  changePage = e => {
    this.refs.child.scrollToPage(e);
    this.setState({ selectedTabIndex: e });
  };
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: LIGHT_GRAY
  },
  segContainer: { paddingHorizontal: 8, paddingBottom: 4, paddingTop: 4 },
  segmentControlStyle: {
    borderColor: APPLE_BLUE_COLOR,
    padding: 8
  },
  selectedSegmentControlStyle: {
    backgroundColor: APPLE_BLUE_COLOR
  }
});

const mapStateToProps = ({ driversReducer, vehiclesReducer }) => {
  return { driversReducer, vehiclesReducer };
};

export default connect(
  mapStateToProps,
  {
    fetchDriversAction,
    fetchVehiclesAction
  }
)(TeamScreen);
