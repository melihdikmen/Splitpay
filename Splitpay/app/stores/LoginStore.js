import { observable, action, computed } from "mobx";
import api from "../config/config"
import {
  Alert,AsyncStorage
} from "react-native";
class store {
  @observable
  username = "";

  @observable
  password = "";

  @observable netCheck=false

  @observable
  disabled = true;

  @action setNetCheck(val){

    this.netCheck=val

  }

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

  changeDisabled() {
    if (this.username && this.password) {
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
  login(success) {
    fetch(api+"/login", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
   
        username:this.username,
        password:this.password
   
    })
   
  }).then((response) => response.json())
        .then((responseJson) => {
   
          // If server response message same as Data Matched
         if(responseJson)
          {
            
              try {
                 AsyncStorage.setItem('userToken', JSON.stringify(responseJson));
              } catch (error) {
                // Error saving data
              }
            
          success()

   
          }
          else{
           
            Alert.alert(
              'Giriş Başarısız',
              'Kullanıcı adı veya şifre yanlış.',
              [
            
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              
            )
            
          }
   
        }).catch((error) => {
          console.error(error);
        });
  }
}

export default new store();
