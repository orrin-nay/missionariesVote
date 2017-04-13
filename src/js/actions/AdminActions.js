import dispatcher from "../dispatcher";
import axios from "axios";
let handlersURL = "https://missionariesvot.000webhostapp.com/"

  export function sendLogin(username, password){
    if(username == undefined || username == null || username == "") {
      dispatcher.dispatch({type: "NO_USER_NAME"});
      return;
    }
    if(password == undefined || password == null || password == "") {
      dispatcher.dispatch({type: "NO_PASSWORD"});
      return;
    }
      let info = new URLSearchParams();
      info.append('username', username);
      info.append('password', password);
    axios.post(handlersURL+"adminlogin.php", info)
      .then((response) => {
        if(response.data == 1){
          dispatcher.dispatch({type: "INVALID_PASSWORD_OR_USERNAME"})
        }
        else {
          dispatcher.dispatch({type: "LOGIN_SUCCESS"})
        }
      })
      .catch((err) => {
        console.log(err);
        dispatcher.dispatch({type: "FETCH_TWEETS_REJECTED", payload: err})
      })
  }
  export function getUsers(){
    axios.get(handlersURL+"getusers.php")
      .then((response) => {
        dispatcher.dispatch({type: "USERS_RECIVED", payload: response.data})
      })
      .catch((err) => {
        console.log(err);
        dispatcher.dispatch({type: "FETCH_TWEETS_REJECTED", payload: err})
      })
  }
  export function deleteUsers(users){
    let userIds = [];
    let info = new URLSearchParams();
    for (var i = 0; i < users.length; i++) {
      if (users[i].checked) {
          userIds.push(users[i].userId)
      }
    }
    if(users.length == 0){
      return;
    }
    info.append("userIds", JSON.stringify(userIds))
    dispatcher.dispatch({type: "SENDING_VOTES"});
    axios.post(handlersURL+"deleteusers.php", info)
      .then((response) => {
        console.log(response.data);
        dispatcher.dispatch({type: "USERS_DELETED", payload: response.data});
        this.getUsers();
      })
      .catch((err) => {
        console.log(err);
        dispatcher.dispatch({type: "FETCH_TWEETS_REJECTED", payload: err})
      })
  }
