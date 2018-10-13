import React, { Component } from "react";
import { Platform, TouchableOpacity, Text, View } from "react-native";
import a from './stores/index'
import { observer } from "mobx-react";


@observer
 export default class index extends Component {
  render() {
    return (
      <View>
          <TouchableOpacity onPress={()=>{a.set("adasda")}}><Text>Bas</Text></TouchableOpacity>
      </View>
    );
  }
}

