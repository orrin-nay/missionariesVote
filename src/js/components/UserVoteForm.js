import React from "react";

import * as UserVoteActions from "../actions/UserVoteActions";
import UserVoteStore from "../stores/UserVoteStore";

export default class UserVoteForm extends React.Component {
  constructor() {
    super();
    this.state = {
      showUserInfo: true,
      showLoding: false,
      showGames: false,
      showErrorMsg: false,
      errorMsg: "",
      gamesList: []
    };
    this.gamesList = "";
    this.userInfoForm =
     <form>
        <label for="name">Name</label>
        <br></br>
        <input type="text" id="name" onChange={this.nameChanged.bind(this)}></input>
        <br></br>

        <label for="email">Email(optional)</label>
        <br></br>
        <input type="email" id="email" onChange={this.emailChanged.bind(this)}></input>
        <br></br>

        <label for="phone">Phone(optional)</label>
        <br></br>
        <input type="tel" id="phone" onChange={this.phoneChanged.bind(this)}></input>

        <br></br>
        <input type="button" id="next" value="next >>" onClick={this.sendUserInfo.bind(this)}></input>
      </form>;
  }
  nameChanged(e){
    this.name = e.target.value;
  }

  emailChanged(e){
    this.email = e.target.value;
  }

  phoneChanged(e){
    this.phone = e.target.value;
  }
  componentWillMount() {
    UserVoteStore.on("SENDING_USER_INFO", this.showLoding.bind(this));
    UserVoteStore.on("NO_NAME_SUBMITTED", this.noName.bind(this));
    UserVoteStore.on("ALREADY_VOTED", this.alreadyVoted.bind(this));
    UserVoteStore.on("INVALID_EMAIL", this.invalidEmail.bind(this));
    UserVoteStore.on("INVALID_PHONE", this.invalidPhone.bind(this));
    UserVoteStore.on("SUCCESFULLY_SENT_USER_INFO", this.showGames.bind(this));
    UserVoteStore.on("GAMES_RECIVED", this.buildGamesList.bind(this));
    UserVoteStore.on("SENDING_VOTES", this.showLoding.bind(this));
    UserVoteStore.on("VOTE_SENT", this.voteSent.bind(this));
    UserVoteActions.getGames();
  }
  componentWillUnmount() {
    UserVoteStore.removeListener("SENDING_USER_INFO", this.showLoding.bind(this));
    UserVoteStore.removeListener("NO_NAME_SUBMITTED", this.noName.bind(this));
    UserVoteStore.removeListener("ALREADY_VOTED", this.alreadyVoted.bind(this));
    UserVoteStore.removeListener("INVALID_EMAIL", this.invalidEmail.bind(this));
    UserVoteStore.removeListener("INVALID_PHONE", this.invalidPhone.bind(this));
    UserVoteStore.removeListener("SUCCESFULLY_SENT_USER_INFO", this.showGames.bind(this));
    UserVoteStore.removeListener("GAMES_RECIVED", this.buildGamesList.bind(this));
    UserVoteStore.removeListener("SENDING_VOTES", this.showLoding.bind(this));
    UserVoteStore.removeListener("VOTE_SENT", this.voteSent.bind(this));
  }
  voteSent(){
    this.showUserInfoForm();
    UserVoteActions.getGraphData();
  }
  showLoding(){
    this.setState({
      showUserInfo: false,
      showLoding: true,
      showGames: false,
      showErrorMsg: false,
    });
  }
  noName(){
    this.setState({
      showUserInfo: true,
      showLoding: false,
      showGames: false,
      showErrorMsg: true,
      errorMsg: "No name submited"
    });
  }
  alreadyVoted(){
    this.setState({
      showUserInfo: true,
      showLoding: false,
      showGames: false,
      showErrorMsg: true,
      errorMsg: "Already voted"
    });
  }
  invalidEmail(){
    this.setState({
      showUserInfo: true,
      showLoding: false,
      showGames: false,
      showErrorMsg: true,
      errorMsg: "Invalid email"
    });
  }
  invalidPhone(){
    this.setState({
      showUserInfo: true,
      showLoding: false,
      showGames: false,
      showErrorMsg: true,
      errorMsg: "Invalid phonenumber"
    });
  }
  showGames(){
    this.setState({
      showUserInfo: false,
      showLoding: false,
      showGames: true,
      showErrorMsg: false,
    });
  }
  showUserInfoForm(){
    this.setState({
      showUserInfo: true,
      showLoding: false,
      showGames: false,
      showErrorMsg: false,
    });
  }
  vote(){
    UserVoteActions.vote(UserVoteStore.games);
  }
  userSelectedGame(e){
    let gameId = e.target.id.substring("gameId".length);
    for (var i = 0; i < UserVoteStore.games.length; i++) {
      if (UserVoteStore.games[i].gameId == gameId) {
        UserVoteStore.games[i].checked = true;
        return;
      }
    }
  }
  buildGamesList(){
    this.setState({
      gamesList : UserVoteStore.games.map(game => <li key={game.gameId} class="game">
      <input onChange={this.userSelectedGame.bind(this)} type="checkbox"
        id={"gameId" + game.gameId}></input>
      <lable for={"gameId" + game.gameId}>{game.name}</lable></li>)
    });
  }
  gameChanged(e){
    this.game = e.target.value;
  }
  sendNewGame(){
    for (var i = 0; i < UserVoteStore.games.length; i++) {
      if(UserVoteStore.games[i].name == this.game){
        return;
      }
    }
    UserVoteActions.sendNewGame(this.game);
  }
  sendUserInfo(){
    UserVoteActions.sendUserInfo(this.name,this.email,this.phone);
  }
  render() {
        return(
          <div>
            {this.state.showErrorMsg?<p class="error">{this.state.errorMsg}</p>:null}
            {this.state.showUserInfo?this.userInfoForm:null}
            {this.state.showLoding?<h2>Loading...</h2>:null}
            {this.state.showGames?
              <div>
                <h2>Games</h2>
                <ul class="noBulletsList">{this.state.gamesList}</ul>
                <form>
                  <label for="addGame">Add game   </label>
                  <input type="button" value="Add" onClick={this.sendNewGame.bind(this)}></input>
                  <br></br>
                  <input type="text" id="addGame" onChange={this.gameChanged.bind(this)}></input>
                  <br></br>
                  <input type="button" value="vote" onClick={this.vote.bind(this)}></input>
                </form>
              </div>:null}
          </div>
        );
      }
    };
