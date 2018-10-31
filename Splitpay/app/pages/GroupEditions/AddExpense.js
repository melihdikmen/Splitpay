/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Text,
  View,
  DatePickerAndroid
} from "react-native";
import Header from "../../components/Header";
import GroupForm from "../../components/groups/GroupForm";

export default class AddExpense extends Component {
  async tarih() {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        return day + "" + month + "" + year;
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <Header
          onPress={() => {
            navigation.popToTop();
          }}
          title={"Harcama Ekle"}
        />
      )
    };
  };
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.container}>
          <GroupForm
            title={"Başlık"}
            placeholder={"Harcamaya bir başlık girin"}
          />
          <GroupForm
            title={"Miktar"}
            placeholder={"Harcanan miktarı giriniz"}
          />

          <GroupForm
            title={"Tarih"}
            placeholder={"Tarihi seçmek dokunun"}
            onPress={() => {
              this.tarih();
            }}
            editable={false}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
