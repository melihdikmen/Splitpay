import { observable, action, computed, toJS } from "mobx";
import api from "../config/config";
import {Alert} from "react-native"
class GroupsStore {
  @observable
  data = ([] = "");
  @observable
  userId = "";
  @observable
  groupName;
  @observable
  groupInfo = "";
  @observable
  groupPay = "";
  @observable enabled = false;

  @computed get getEnabled() {
    return this.enabled;
  }
  @action
  setGroupName(text) {
    this.groupName = text;
    this.isEnabled();
  }

  @action
  setGroupInfo(text) {
    this.groupInfo = text;
  }

  @action
  setGroupPay(text) {
    this.groupPay = text;
  }
  @action
  setUserId(id) {
    this.userId = id;
  }

  @action isEnabled() {
    if (this.groupName) {
      this.enabled = true;
    } else {
      this.enabled = false;
    }
  }

  @action deleteGroup(groupId, success) {
    fetch(api + "/deleteGroup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: this.userId,
        groupId: groupId
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        // If server response message same as Data Matched
        if (responseJson) {
          console.warn(responseJson)
          success();
        } else if(responseJson=="") {
          Alert.alert(
            'Hata',
            'Grup silinemedi',
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

  @action createGroup(success) {
    fetch(api + "/createGroup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: this.userId,
        groupName: this.groupName,
        groupInfo: this.groupInfo,
        
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        // If server response message same as Data Matched
        if (responseJson) {
          success();
          console.warn(responseJson)

          this.enabled = false;
        } else {
          Alert.alert(
            'Hata',
            'Grup oluşturulamadı.',
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
  @action
  getAll() {
    fetch(api + "/getGroups", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: this.userId
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        // If server response message same as Data Matched
        if (responseJson) {
          this.data = responseJson;
        } else {
          this.data = "";
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  @computed
  get getGroups() {
    return toJS(this.data);
  }
}

export default new GroupsStore();
