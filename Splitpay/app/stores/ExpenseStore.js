import { observable, action, computed, toJS } from "mobx";
import api from "../config/config";
class ExpenseStore {
  @observable
  groupId = 0;
  @observable
  data = [] = "";

  @action
  setGroupId(id) {
    this.groupId = id;
    
  }

  @computed get getExpenses()
  {
      return toJS(this.data)
  }

  @action
  getAll() {
    fetch(api + "/getExpenses", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        groupId: this.groupId
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        // If server response message same as Data Matched
        if (responseJson) {
          this.data = responseJson;
          console.warn(this.data)
          
        } else {
          this.data = "";
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
}

export default new ExpenseStore();
