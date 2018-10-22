import { observable, action, computed, toJS } from "mobx";
import api from "../config/config";
class GroupsStore {
 @observable data = [];

  @action
  getAll() {
    return fetch(api + "/getGroups")
      .then(response => response.json())
      .then(responseJson => {
        this.data = responseJson;
        
      })
      .catch(error => {
        console.error(error);
      });
  }

  @computed
  get getGroups() {
   return toJS(this.data)
  }
}

export default new GroupsStore();
