/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { TextInput, StyleSheet,  View,Text,TouchableOpacity} from "react-native";

export default class GroupForm extends Component {
  constructor(props) {
    super(props);
    this.state = { focus: false };
  }

  render() {
    return (
      <View style={styles.loginInput}>
      <Text style={styles.title}>{this.props.title}</Text>
      <TouchableOpacity onPress={this.props.onPress}>
        <TextInput
          onChangeText={this.props.store}
          underlineColorAndroid="transparent"
          keyboardType={this.props.keyboard}
          maxLength={this.props.length}
          value={this.props.value}
          editable={this.props.editable}
          style={[
            styles.username,
            { borderColor: this.state.focus ? "#ff1e5a" : "#ddd" }
          ]}
          placeholder={this.props.placeholder}
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
        /></TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  username: {
    borderWidth: 1,
   // borderColor:'#ff1443',
    height: 60,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    padding: 5,
    paddingLeft: 10,
   // backgroundColor: "#dddd",
    //elevation: 1,
    marginTop:5
  },

  title:{
    fontSize:15,
    color:'#ff1443',
    marginLeft:5
  },

  loginInput: {
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  }
});
