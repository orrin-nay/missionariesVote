import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class UserVoteStore extends EventEmitter {
  constructor() {
    super();
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
      case "GAMES_RECIVED": {
        this.storeGames(action.payload);
        this.emit("GAMES_RECIVED");
        break;
      }
      case "SUCCESFULLY_SENT_GAME": {
        this.addGame(action.payload);
        this.emit("GAMES_RECIVED");
        break;
      }
      case "SENDING_VOTES": {
        this.emit("SENDING_VOTES");
        break;
      }
      case "VOTE_SENT": {
        this.emit("VOTE_SENT");
        break;
      }
      case "RECIVED_GRAPH_DATA": {
        this.setGraphData(action.payload);
        this.emit("RECIVED_GRAPH_DATA");
        break;
      }
    }
  }
  setGraphData(data){
    let tempdata = [];
    for (let k in data){
      if (data.hasOwnProperty(k)) {
           tempdata.push({text: this.toTitleCase(k), value: data[k]})
      }
    }
    this.graphData = tempdata;
  }
  storeGames(games){
    this.games = [];
    for (var i = 0; i < games.length; i++) {
      this.games.push({
        "name": this.toTitleCase(games[i][1]),
        "gameId": games[i][0],
        "checked": false
      });
    }
  }
  addGame(game){
    this.games.push({
      "name": this.toTitleCase(game[1]),
      "gameId": game[0],
      "checked": false
    });
  }
  toTitleCase(str)
  {
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
}
const userVoteStore = new UserVoteStore;
dispatcher.register(userVoteStore.handleActions.bind(userVoteStore));

export default userVoteStore;
