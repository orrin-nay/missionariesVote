import dispatcher from "../dispatcher";
import axios from "axios";
let handlersURL = "http://localhost:80/missionariesvote/phpscripts/"
export function sendUserInfo(name, email, phone) {
  let info = new URLSearchParams();
  if(name == undefined || name == null || name == "") {
    dispatcher.dispatch({type: "NO_NAME_SUBMITTED"});
    console.log("NO_NAME_SUBMITTED");
    return;
  }
  if(email !== undefined && email !== null&& email != "") {
    let re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(!re.test(email)){
      dispatcher.dispatch({type: "INVALID_EMAIL"});
      console.log("INVALID_EMAIL");
      return;
    }
    info.append('email', email);
  }
  if(phone != undefined && phone != null && phone != "") {
    phone = phone.replace(/[^\d\+]/g,"");
    if(phone.charAt(0) == '1'){
      phone = phone.substr(1);
    }
    if(phone.length != 10){
      dispatcher.dispatch({type: "INVALID_PHONE"});
      console.log("INVALID_PHONE");
      return;
    }
    info.append('phone', phone);
  }
  info.append('name', name);
  dispatcher.dispatch({type: "SENDING_USER_INFO"});
  axios.post(handlersURL + "senduserinfo.php",
  info
    )
    .then((response) => {
      switch (response.data) {
        case 0:
          dispatcher.dispatch({type: "NO_NAME_SUBMITTED"});
          break;
        case 1:
          dispatcher.dispatch({type: "ALREADY_VOTED"});
          break;
        case 2:
          dispatcher.dispatch({type: "INVALID_EMAIL"});
          break;
        case 3:
          dispatcher.dispatch({type: "INVALID_PHONE"});
          break;
        default:
          dispatcher.dispatch({type: "SUCCESFULLY_SENT_USER_INFO"});
      }
    })
    .catch((err) => {
      dispatcher.dispatch({type: "FETCH_TWEETS_REJECTED", payload: err})
    })
}
export function sendNewGame(game) {
  let info = new URLSearchParams();
  if(game == undefined || game == null || game == "") {
    dispatcher.dispatch({type: "NO_GAME_SUBMITTED"});
    console.log("NO_GAME_SUBMITTED");
    return;
  }
  info.append('game', game);
  axios.post(handlersURL + "sendgame.php",
  info
    )
    .then((response) => {
      switch (response.data) {
        case 0:
          dispatcher.dispatch({type: "NO_GAME_SUBMITTED"});
          break;
        case 1:
          dispatcher.dispatch({type: "GAME_ALREADY_SUBMITTED"});
          break;
        default:
          dispatcher.dispatch({type: "SUCCESFULLY_SENT_GAME", payload: response.data});
      }
    })
    .catch((err) => {
      dispatcher.dispatch({type: "FETCH_TWEETS_REJECTED", payload: err})
    })
  }
  export function getGames(){
    axios.get(handlersURL+"getgames.php")
      .then((response) => {
        dispatcher.dispatch({type: "GAMES_RECIVED", payload: response.data})
      })
      .catch((err) => {
        console.log(err);
        dispatcher.dispatch({type: "FETCH_TWEETS_REJECTED", payload: err})
      })
  }
  export function vote(games){
    let gameIds = [];
    let info = new URLSearchParams();
    for (var i = 0; i < games.length; i++) {
      if (games[i].checked) {
          gameIds.push(games[i].gameId)
      }
    }
    info.append("votes", JSON.stringify(gameIds))
    dispatcher.dispatch({type: "SENDING_VOTES"});
    axios.post(handlersURL+"sendvote.php", info)
      .then((response) => {
        dispatcher.dispatch({type: "VOTE_SENT", payload: response.data})
      })
      .catch((err) => {
        console.log(err);
        dispatcher.dispatch({type: "FETCH_TWEETS_REJECTED", payload: err})
      })
  }
  export function getGraphData(){
    axios.post(handlersURL+"getbargraphdata.php")
      .then((response) => {
        dispatcher.dispatch({type: "RECIVED_GRAPH_DATA", payload: response.data})
      })
      .catch((err) => {
        console.log(err);
        dispatcher.dispatch({type: "FETCH_TWEETS_REJECTED", payload: err})
      })
  }
