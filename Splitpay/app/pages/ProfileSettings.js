/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
  View,
  Image,

} from "react-native";

import Header from "../components/Header";
import SettingForm from "../components/GroupEdition/SettingForm";
import AddButton from "../components/GroupEdition/AddExpenseButton";
import ProfileStore from "../stores/ProfileStore";
import ImagePicker from "react-native-image-picker";
import { observer } from "mobx-react";

const options = {
  title: "Fotoğraf Seç",
  takePhotoButtonTitle: "Fotoğraf Çek",
  chooseFromLibraryButtonTitle: "Galeriden Seç",
  quality: 1
};

@observer
export default class ProfileSettings extends Component {
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
        ProfileStore.UploadImage(response.uri);
        ProfileStore.getUser();
      }
    });
  }

  componentDidMount() {
    ProfileStore.getUser();
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.selectPhoto();
          }}
          style={styles.imageArea}
        >
          <Image
            style={styles.photo}
            key={new Date()}
            source={{
              uri:
                api + "uploads/" + ProfileStore.path + ".jpg" + "?" + new Date()
            }}
          />
        </TouchableOpacity>
        <View style={styles.content}>
          <View style={styles.form}>
            <SettingForm
              onchange={text => {
                ProfileStore.setFullname(text);
              }}
              value={ProfileStore.fullname}
              title={"Ad ve Soyad"}
            />
            <SettingForm
              onchange={text => {
                ProfileStore.setUsername(text);
              }}
              value={ProfileStore.username}
              title={"Kullanıcı Adı"}
            />
          </View>
          <View style={styles.AddButton}>
            <AddButton
              onPress={() => {
                ProfileStore.UpdateUser();
              }}
              text={"Kaydet"}
            />
          </View>
          <View style={styles.AddButton}>
            <AddButton
              onPress={() => {
                AsyncStorage.removeItem("userToken"),
                this.props.navigation.navigate("AuthLoading")
              }}
              text={"Çıkış Yap"}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFF"
  },

  imageArea: {
    justifyContent: "center",
    alignItems: "center",
    flex: 2
  },

  photo: {
    height: 120,
    width: 120,
    borderRadius: 60
  },

  content: {
    flex: 3
  },

  AddButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 70
  },
  form: {
    //flex: 3
  }
});
