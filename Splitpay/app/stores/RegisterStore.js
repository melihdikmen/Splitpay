import { observable, action, computed } from "mobx";
import { Alert } from "react-native";
import api from "../config/config"

class store {
  @observable
  username = "";

  @observable
  password = "";

  @observable
  name;
  @observable
  passwordAgain;
  @observable
  disabled = true;
  @action
  setUsername(username) {
    this.username = username;
    this.changeDisabled();
  }

  @action
  setPassword(password) {
    this.password = password;
    this.changeDisabled();
  }

  @action
  setName(name) {
    this.name = name;
    this.changeDisabled();
  }

  @action
  setPasswordAgain(passwordAgain) {
    this.passwordAgain = passwordAgain;
    this.changeDisabled();
  }

  changeDisabled() {
    if (this.username && this.password && this.name && this.passwordAgain) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  }

  @computed
  get getButton() {
    return this.disabled;
  }

  @action
  register(success){
    this.password==this.passwordAgain?
    (fetch(api+"/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.username,
        password: this.password,
        fullname: this.name
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        // If server response message same as Data Matched
        if (responseJson == "true") {
          success()
        } else if (responseJson == "isUse") {
          Alert.alert("Kayıt Hatası", "Kullancı adı kullanımda", [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]);
        } else {
          Alert.alert("Kayıt Hatası", "Kayıt olunamadı", [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]);
        }
      })
      .catch(error => {
        console.error(error);
      })):
      
      alert("Şifreler Eşleşmiyor")
  }
}

export default new store();
