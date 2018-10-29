/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

export default class AddExpenseButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Ekle</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1
  },

  button: {
    height: 60,
    backgroundColor: "#ff0048",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    marginLeft: 15,
    borderRadius: 30
  },
  text: {
    color: "#FFFF",
    fontSize:20
  }
});
