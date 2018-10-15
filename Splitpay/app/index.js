import React, { Component } from "react";
import { Platform, TouchableOpacity, Text, View } from "react-native";
import a from './stores/index'
import { observer } from "mobx-react";

import Router from './config/router'


@observer
 export default class index extends Component {
  render() {
    return (
     <Router/>
    );
  }
}

