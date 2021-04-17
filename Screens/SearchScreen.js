import React from "react";
import { StyleSheet, Text, View , TextInput } from "react-native";

export default class Search extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>IN search</Text>
        <TextInput
        placeholder="Enter your text here"
        keyboardAppearance="dark"
        style={styles.input}
      ></TextInput>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#58355E",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFF689",
  },
});
