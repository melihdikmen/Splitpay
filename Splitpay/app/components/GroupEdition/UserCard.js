/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import api from "../../config/config";
import Icon from "react-native-vector-icons/FontAwesome5";
var { height, width } = Dimensions.get("window");
export default class UserCard extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.profilePhoto}>
          <TouchableOpacity>
            <Image
              source={{ uri: api + "/uploads/avatar.png" }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.fullname}>{this.props.fullname}</Text>
       <TouchableOpacity onPress={this.props.onpress} style={[styles.addButton,{display:this.props.display}]}><Text style={{color:'#ff1443'}}>{this.props.text}</Text></TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 80,

    backgroundColor: "#fff",
    flexDirection: "row",

    alignItems: "center",

    borderBottomWidth: 1,
    borderBottomColor: "#dddd"
  },

  avatar: {
    height: 60,
    width: 60,
    borderRadius: 30
  },

  profilePhoto: {
    flex: 1,

    backgroundColor: "transparent",

    marginLeft: 10
  },
  fullname: {
    flex: 3,
    marginLeft: 5,
    fontWeight: "bold",
    color: "black",
    fontSize: 20
  },
  addButton:{
    marginRight:10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:1,
    borderColor:'#ff1443',
    flex:1,
   borderRadius:5,
    
  }
});
