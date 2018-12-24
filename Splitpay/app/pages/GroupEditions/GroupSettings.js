/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
 
} from "react-native";
import api from "../../config/config";

import Header from "../../components/Header";
import SettingForm from "../../components/GroupEdition/SettingForm";
import AddButton from "../../components/GroupEdition/AddExpenseButton";
import { observer } from "mobx-react";
import ExpenseStore from "../../stores/ExpenseStore";
import ImagePicker from "react-native-image-picker";
const options = {
  title: "Fotoğraf Seç",
  takePhotoButtonTitle: "Fotoğraf Çek",
  chooseFromLibraryButtonTitle: "Galeriden Seç",
  quality: 1
};

@observer
export default class GroupSettings extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    ExpenseStore.getGroupSetting();
   
  }
 

  selectPhoto() {
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        //const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        ExpenseStore.setImage(response.uri);
        ExpenseStore.UploadImage();
      }
    });
  }
  

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >

     
        <View style={styles.container}>
          <Header
            disabled={true}
            opacity={0}
            onPress={() => {
              this.props.navigation.popToTop();
            }}
            title={"Grup Ayarları"}
          />
          <TouchableOpacity
            onPress={this.selectPhoto.bind(this)}
            style={styles.imageArea}
          >
            <Image
              style={styles.photo}
              key={new Date()}
              source={{
                uri:api+"uploads/group/"+ExpenseStore.getPath+".jpg"+ '?' + new Date()
              }}
            />
          </TouchableOpacity>
          <View style={styles.content}>
            <Text
              style={{
                color: "#ff1443",
                fontSize: 15,
                marginTop: 10,
                marginLeft: 5,
                marginBottom: 10
              }}
            >
              Grup Bilgileri
            </Text>
            <SettingForm
              onchange={text => {
                ExpenseStore.setGroupName(text);
              }}
              title={"Grup Adı"}
              value={ExpenseStore.groupName}
            />
            <SettingForm
              onchange={text => {
                ExpenseStore.setGroupInfo(text);
              }}
              title={"Grup Açıklama"}
              value={ExpenseStore.groupInfo}
            />
          </View>
          <View
            style={{ justifyContent: "center", flex: 1, alignItems: "center" }}
          >
            <AddButton
              onPress={() => {
                ExpenseStore.UpdateGroupSetting();
              }}
              text={"Güncelle"}
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
  imageArea: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },

  content: {
    flex: 3
  },

  photo: {
    height: 120,
    width: 120,
    borderRadius: 60
  }
});
