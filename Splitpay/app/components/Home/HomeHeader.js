/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, Text, View,TouchableOpacity } from "react-native";

export default class App extends Component {
  constructor(props)
  {
    super(props)
   
  }
  render() {
    return (
     
      <View style={styles.container}>
       <TouchableOpacity onPress={this.props.onPress}>
        <Text style={styles.text}>Gruplar</Text>
        </TouchableOpacity>
      </View>
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  text: {
    fontSize: 25,
    color: "#000",
    fontWeight: 'bold',
  }
});
