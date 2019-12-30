import React, { Component } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { fetchTipsAction } from "../actions";
import Loading from "../components/common/Loading";
import TipsList from "../components/Tips/TipsList";
import { LIGHT_GRAY, YELLOW_COLOR } from "../constants";
import { LOADING_TIPS } from "../StringValues";

class TipsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.fetchTipsAction();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.renderTipsList()}
      </SafeAreaView>
    );
  }

  renderTipsList = () => {
    const { tips, isLoadingTips } = this.props;
    if (isLoadingTips) {
      return <Loading text={LOADING_TIPS} />;
    } else {
      return <TipsList tips={tips} />;
    }
  };
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: YELLOW_COLOR
  }
});

const mapStateToProps = ({ tipsReducer }) => {
  const { tips, isLoadingTips } = tipsReducer;
  return { tips, isLoadingTips };
};

export default connect(
  mapStateToProps,
  {
    fetchTipsAction
  }
)(TipsScreen);
