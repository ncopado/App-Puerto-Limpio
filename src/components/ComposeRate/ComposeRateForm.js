import React, { Component } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import { AirbnbRating } from "react-native-ratings";
import {
  COMPOSE_RATE_LABEL_TEXT,
  COMPOSE_RATE_INPUT_PLACEHOLDER,
  REVIEWS_RATES
} from "../../StringValues";

export default class ComposeRateForm extends Component {
  render() {
    let { text, onChangeText, onFinishRating } = this.props;
    return (
      <View>
        <Text style={styles.description}>{COMPOSE_RATE_LABEL_TEXT}</Text>
        <AirbnbRating
          count={5}
          reviews={REVIEWS_RATES}
          defaultRating={1}
          onFinishRating={onFinishRating}
          size={30}
        />
        <TextInput
          multiline={true}
          style={styles.text}
          placeholder={COMPOSE_RATE_INPUT_PLACEHOLDER}
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="gray"
          onChangeText={text => onChangeText(text)}
          value={text}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  description: {
    fontSize: 30,
    color: "gray",
    fontFamily: "NeoSansPro-Bold"
  },
  text: {
    backgroundColor: "white",
    height: 60,
    borderColor: "gray",
    borderWidth: 0.2,
    marginVertical: 8,
    flexGrow: 1,
    borderRadius: 5,
    padding: 8,
    flexGrow: 1,
    fontFamily: "NeoSans-Medium"
  }
});
