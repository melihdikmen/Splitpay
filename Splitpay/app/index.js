import React, { Component } from "react";
import { Platform, TouchableOpacity, StatusBar, View } from "react-native";

import { observer } from "mobx-react";

import Router from "./config/router";

@observer
export default class index extends Component {
  render() {
    return (
      
       
        <Router />
       
      
    );
  }
}
