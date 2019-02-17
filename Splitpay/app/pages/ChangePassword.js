/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  View,
  Image,
  TouchableWithoutFeedback
} from "react-native";

import Header from "../components/Header";
import SettingForm from "../components/GroupEdition/SettingForm";
import AddButton from "../components/GroupEdition/AddExpenseButton";
import ProfileStore from "../stores/ProfileStore";
import ImagePicker from "react-native-image-picker";
import { observer } from "mobx-react";

@observer
export default class ChangePassword extends Component {
  componentDidMount() {}

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.container}>
          <View style={styles.form}>
            <SettingForm
              secureTextEntry={true}
              onchange={text => {
                ProfileStore.setPassword(text);
              }}
              placeholder={"Yeni Şifreyi Giriniz"}
              title={"Şifre"}
            />
            <SettingForm
              secureTextEntry={true}
              onchange={text => {
                ProfileStore.setPasswordAgain(text);
              }}
              placeholder={"Yeni Şifreyi Giriniz"}
              title={"Şifre Tekrar"}
            />
          </View>
          <View style={styles.AddButton}>
            <AddButton
              onPress={() => {
                ProfileStore.ChangePassword();
              }}
              text={"Değiştir"}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFF"
  },

  AddButton: {
    //flex: 3,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50
  },
  form: {
    //flex:1
  }
});
