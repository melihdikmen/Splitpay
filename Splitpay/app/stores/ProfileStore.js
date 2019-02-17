import { observable, action, computed, toJS } from "mobx";
import {ToastAndroid} from 'react-native'
import api from "../config/config";
import { Alert, AsyncStorage } from "react-native";
import ChangePassword from "../pages/ChangePassword";
class store {
  @observable
  username = "";

  @observable
  password = "";

  @observable fullname = "";

  @observable userId = "";

  @observable passwordAgain = "";

  @observable user = "";

  @observable path=""


  @computed get getFullname(){

    return this.fullname
  }

  @action
  set(user) {
 
    this.userId = user.userId;
    
  }

  @action setFullname(text) {
    this.fullname = text+"";
    //console.warn(this.fullname);
  }

  @action setUsername(text) {
    this.username = text;
   // console.warn(this.username);
  }

  @action setPassword(text){

    this.password=text
   // console.warn(this.password)

  }

  @action setPasswordAgain(text){

    this.passwordAgain=text
    //console.warn(this.passwordAgain)

  }

  @action ChangePassword()
  {
    if(this.password==this.passwordAgain)
    {
      fetch(api + "/ChangePassword", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
           userId:this.userId, 
           password:this.password
          
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          // If server response message same as Data Matched
          if (responseJson) {
            
              console.warn(responseJson)
              ToastAndroid.show(
                  "Şifre başarı ile güncellendi.",
                  ToastAndroid.LONG
                );
            
          } else {
              console.warn(responseJson)
            
          }
        })
        .catch(error => {
          console.error(error);
        });
    }


    else
    {

      Alert.alert(
        'Hata',
        'Şifreler aynı değil.',
        [
          
          {text: 'Tamam', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )

    }


  }

  @action UpdateUser() {
    fetch(api + "/UpdateUser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
         userId:this.userId, 
         fullname:this.fullname,
        username: this.username,
        
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        // If server response message same as Data Matched
        if (responseJson) {
          
            console.warn(responseJson)
            ToastAndroid.show(
                "Ayarlar başarı ile güncellendi.",
                ToastAndroid.LONG
              );
          
        } else {
            console.warn(responseJson)
          
        }
      })
      .catch(error => {
        console.error(error);
      });
  }



  @action UploadImage(uri)
  { 
    const data=new FormData()
    
    data.append("userId",this.userId)
    data.append("photo",{
      uri:uri,
      type:"image/jpeg",
      name:this.userId+".jpg"
    })


    fetch(api + "/UserPhoto", {
      method: "POST",
      headers: {
        Accept: "application/json",
        'Content-Type': 'multipart/form-data',
      },
      body: data
    })
      .then(response => response.json())
      .then(responseJson => {
        // If server response message same as Data Matched
        if (responseJson) {
          
          this.getUser();
         
          ToastAndroid.show('Fotoğraf değiştirme işlemi başarılı.', ToastAndroid.SHORT);
          
        } else {
          Alert.alert(
            'Hata',
            'Fotoğraf Yüklenemedi',
            [
              
              {text: 'Tamam', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
         
        }
      })
      .catch(error => {
        console.error(error);
      });




  }

  @action getUser()
  {

    fetch(api + "/getUser", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
           userId:this.userId, 
          
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          // If server response message same as Data Matched
          if (responseJson) {
            
              console.warn(responseJson)
              this.fullname=responseJson.fullname
              this.username=responseJson.username
              this.path=responseJson.path
                
            
          } else {
              console.warn(responseJson)
            
          }
        })
        .catch(error => {
          console.error(error);
        });


  }
}

export default new store();
