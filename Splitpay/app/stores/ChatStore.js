import { observable, action, computed, toJS, autorun } from "mobx";
import api from "../config/config";

import {} from "react-native";

import {
  ChatManager,
  TokenProvider
} from "@pusher/chatkit-client/react-native";
import AddMember from "../pages/GroupEditions/AddMember";
class ChatStore {
  @observable
  groupId = "";

  @observable
  userId = "";

  @observable roomId = "";

  allMessages = observable.box((messages = []));

  @observable message = "";

  @computed get Messages() {
    return toJS(this.allMessages.get());
  }

  @action setGroupId(id) {
    this.groupId = id;
  }

  @action setRoomId(id) {
    this.roomId = id;
  }

  @action setMessage(message) {
    this.message = message;
  }

  @action setUserId(userId) {
    this.userId = userId;
    //console.warn(this.userId)
  }

  @action getRoomId() {
    fetch(api + "/getRoomId", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: this.userId,
        groupId: this.groupId
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        // If server response message same as Data Matched
        if (responseJson) {
          this.setRoomId(responseJson);
        } else {
          console.warn(responseJson);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  @action GetAllMessages() {
    this.messages = [];
    fetch(api + "/getMessages", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: this.userId,
        groupId: this.groupId
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        // If server response message same as Data Matched
        if (responseJson) {
          console.warn(responseJson);
          responseJson.forEach(element => {
            this.messages.push({
              _id: element.id,
              text: element.text,
              createdAt: element.created_at,
              user: {
                _id: element.user_id,
                name: element.name,
                avatar:  api + "uploads/"+element.user_id+".jpg"+ "?" + new Date()
              }
            });
          });

          this.allMessages.set(this.messages);
        } else {
          this.allMessages.set((this.messages = []));
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  @action control(message) {
    let cont = true;
    this.messages.forEach(element => {
      if (element._id == message.id) {
        cont = false;
      }
    });

    return cont;
  }

  @action OnMessage() {
    const chatManager = new ChatManager({
      instanceLocator: "v1:us1:07e507ed-1800-4f8e-a9d7-dd159a60b9f4",
      userId: this.userId.toString(),
      tokenProvider: new TokenProvider({
        url:
          "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/07e507ed-1800-4f8e-a9d7-dd159a60b9f4/token"
      })
    });

    chatManager.connect().then(currentUser => {
      currentUser.subscribeToRoom({
        roomId: this.roomId.toString(),
        hooks: {
          onMessage: message => {
            if (this.control(message)) {
              this.messages.unshift({
                _id: message.id,
                text: message.text,
                createdAt: message.createdAt,
                user: {
                  _id: message.sender.id,
                  name: message.sender.name,
                  avatar:  api + "uploads/"+message.sender.id+".jpg"+ "?" + new Date()
                }
              });
            }

            message = "";
            this.allMessages.set(this.messages);
            console.warn(this.Messages);
          }
        },
        messageLimit: 1
      });
    });
  }

  @action SendMessage([message]) {
    const chatManager = new ChatManager({
      instanceLocator: "v1:us1:07e507ed-1800-4f8e-a9d7-dd159a60b9f4",
      userId: this.userId.toString(),
      tokenProvider: new TokenProvider({
        url:
          "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/07e507ed-1800-4f8e-a9d7-dd159a60b9f4/token"
      })
    });

    chatManager.connect().then(currentUser => {
      currentUser.sendMessage({
        roomId: this.roomId,
        text: message.text
      });
    });
  }

  @action AddMember(userId) {
    console.warn(userId)
    console.warn(this.roomId)
    const chatManager = new ChatManager({
      instanceLocator: "v1:us1:07e507ed-1800-4f8e-a9d7-dd159a60b9f4",
      userId: this.userId.toString(),
      tokenProvider: new TokenProvider({
        url:
          "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/07e507ed-1800-4f8e-a9d7-dd159a60b9f4/token"
      })
    });

    chatManager.connect().then(currentUser => {
      currentUser
        .addUserToRoom({
          userId: userId,
          roomId: this.roomId
        })
        .then(() => {
          console.warn("Added keith to room 123");
        })
        .catch(err => {
          console.warn(`Error adding keith to room 123: ${err}`);
        });
    });
  }
}

export default new ChatStore();
