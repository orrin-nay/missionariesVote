import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class AdminStore extends EventEmitter {
  constructor() {
    super();
  }

  handleActions(action) {
    switch(action.type) {
      case "NO_USER_NAME": {
        this.emit("NO_USER_NAME");
        break;
      }
      case "NO_PASSWORD": {
        this.emit("NO_PASSWORD");
        break;
      }
      case "INVALID_PASSWORD_OR_USERNAME": {
        this.emit("INVALID_PASSWORD_OR_USERNAME");
        break;
      }
      case "LOGIN_SUCCESS": {
        this.emit("LOGIN_SUCCESS");
        break;
      }
      case "USERS_RECIVED": {
        this.storeUsers(action.payload)
        this.emit("USERS_RECIVED");
        break;
      }
      case "USERS_DELETED": {
        this.emit("USERS_DELETED");
        break;
      }
    }
  }
  storeUsers(users){
    this.users = [];
    for (var i = 0; i < users.length; i++) {
      this.users.push({
        "name": users[i][1],
        "userId": users[i][0],
        "checked": false
      });
    }
  }
}

const adminStore = new AdminStore;
dispatcher.register(adminStore.handleActions.bind(adminStore));

export default adminStore;
