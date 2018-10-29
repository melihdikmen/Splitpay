/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { TextInput, StyleSheet,  View,} from "react-native";

export default class GroupForm extends Component {
  constructor(props) {
    super(props);
    this.state = { focus: false };
  }

  render() {
    return (
      <View style={styles.loginInput}>
        <TextInput
          onChangeText={this.props.store}
          underlineColorAndroid="transparent"
          keyboardType={this.props.keyboard}
          maxLength={this.props.length}
         
          style={[
            styles.username,
            { borderColor: this.state.focus ? "#ff1e5a" : "#fff" }
          ]}
          placeholder={this.props.groupName}
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
  username: {
    borderWidth: 1.5,
    // borderColor:'#ff1443',
    height: 60,
    borderRadius: 30,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    padding: 5,
    paddingLeft: 10,
    backgroundColor: "#ffff",
    elevation: 2,
    
  },

  loginInput: {
    marginTop: 10
  }
});
