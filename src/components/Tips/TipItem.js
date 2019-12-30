import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default class TipItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { tip } = this.props;
    const { photoURL } = tip;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.profileImage}
            resizeMode="contain"
            source={require("../../images/Logo2.png")}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{tip.title}</Text>
            <Text style={styles.body}>{tip.message}</Text>
          </View>
        </View>

        <Image
          style={{
            height: 200,
            resizeMode: "stretch",
            borderRadius: 10,
            width: "100%"
          }}
          source={
            photoURL
              ? { uri: photoURL }
              : require("../../icons/placeholders/Tip_Placeholder.png")
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: "white",
    borderRadius: 10
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    marginVertical: 4
  },
  profileImage: {
    width: 50,
    height: 50,
    borderWidth: 0.7,
    borderColor: "gray",
    borderRadius: 25
  },
  titleView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  textContainer: { alignSelf: "flex-start", flex: 1, padding: 4 },
  title: {
    fontSize: 18,
    flex: 1,
    fontFamily: "NeoSansPro-Bold",
    color: "gray"
  },
  body: { fontSize: 15, fontFamily: "NeoSans-Medium", color: "gray" }
});
