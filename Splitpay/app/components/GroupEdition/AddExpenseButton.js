/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity,Dimensions } from "react-native";
var {height, width} = Dimensions.get('window');
export default class AddExpenseButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View    style={styles.container}>
        <TouchableOpacity  onPress={this.props.onPress} style={styles.button}>
          <Text style={styles.text}>{this.props.text}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: 'center',
    flex: 1,
    backgroundColor:'rgba(0,0,0,0)',
    position:"absolute",
    marginTop:height-150,
   
    
  },

  button: {
    
    height: 60,
    backgroundColor: "#ff0048",
    justifyContent: "center",
    alignItems: "center",
    //marginRight: 15,
    //marginLeft: 15,
    borderRadius: 30,
    width:width-30,
    flex:1
  },
  text: {
    color: "#FFFF",
    fontSize:20
  }
});
