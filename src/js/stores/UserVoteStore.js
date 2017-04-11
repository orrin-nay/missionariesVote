import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class UserVoteStore extends EventEmitter {
  constructor() {
    super()
    this.todos = [
      {
        id: 113464613,
        text: "Go Shopping",
        complete: false
      },
      {
        id: 235684679,
        text: "Pay Water Bill",
        complete: false
      },
    ];
  }

  createTodo(text) {
    const id = Date.now();

    this.todos.push({
      id,
      text,
      complete: false,
    });

    this.emit("change");
  }

  getAll() {
    return this.todos;
  }

  handleActions(action) {
    switch(action.type) {
      case "SENDING_USER_INFO": {
        this.emit("SENDING_USER_INFO");
        break;
      }
      case "NO_NAME_SUBMITTED": {
        this.emit("NO_NAME_SUBMITTED");
        break;
      }
      case "ALREADY_VOTED": {
        this.emit("ALREADY_VOTED");
        break;
      }
      case "INVALID_EMAIL": {
        this.emit("INVALID_EMAIL");
        break;
      }
      case "INVALID_PHONE": {
        this.emit("INVALID_PHONE");
        break;
      }
      case "SUCCESFULLY_SENT_USER_INFO": {
        this.emit("SUCCESFULLY_SENT_USER_INFO");
        break;
      }
    }
  }

}

const userVoteStore = new UserVoteStore;
dispatcher.register(userVoteStore.handleActions.bind(userVoteStore));

export default userVoteStore;
