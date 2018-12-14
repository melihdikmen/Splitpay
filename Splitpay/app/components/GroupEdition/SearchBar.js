/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Text, StyleSheet, View, TextInput, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
var { height, width } = Dimensions.get("window");
export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focus: false
    };
  }

  render() {
    return (
      <View
        style={[
          styles.container,
          { borderColor: this.state.focus ? "#ff1443" : "#ffff" }
        ]}
      >
        <Icon style={styles.icon} name={"search"} size={20} />
        <TextInput
          onChangeText={this.props.SearchUser}
          placeholder={"Üye Ara"}
          style={styles.textInput}
          underlineColorAndroid={"transparent"}
          onFocus={() => {
            this.setState({
              focus: true
            });
          }}
          onBlur={() => {
            this.setState({
              focus: false
            });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    width: width - 40,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 30,
    //justifyContent: 'center',
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1
  },

  icon: {
    flex: 1,
    marginLeft: 10
  },

  textInput: {
    marginLeft: 10,
    fontSize: 20,
    flex: 10
  }
});
