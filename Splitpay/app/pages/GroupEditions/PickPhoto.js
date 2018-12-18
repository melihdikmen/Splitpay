/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { ScrollView, StyleSheet, Image, View, CameraRoll,TouchableOpacity } from "react-native";
import ExpenseStore from "../../stores/ExpenseStore"
import ImagePicker from 'react-native-image-picker';

const options = {
    title: 'Select Avatar',
    takePhotoButtonTitle:"Fotoğraf Çek",
    chooseFromLibraryButtonTitle:'Galeriden Seç'
  };


export default class PickPhoto extends Component {
    render() {
    return (
      <View>
 
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
  }
});
