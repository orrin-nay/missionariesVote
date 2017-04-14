import React from "react";
import { IndexLink, Link } from "react-router";
import * as AdminActions from "../actions/AdminActions";
import * as UserVoteActions from "../actions/UserVoteActions";
import UserVoteStore from "../stores/UserVoteStore";
import AdminStore from "../stores/AdminStore";

export default class GameTable extends React.Component {
  constructor() {
    super();
    this.state = {
      userTable: "",
      tableLoded: false
    };
  }
  componentWillMount() {
    UserVoteStore.on("GAMES_RECIVED", this.setTable.bind(this));
    AdminStore.on("GAMES_DELETED", this.reGetGames.bind(this));
    UserVoteActions.getGames();
  }
  componentWillUnmount() {
    UserVoteStore.removeListener("GAMES_RECIVED", this.setTable.bind(this));
    AdminStore.removeListener("GAMES_DELETED", this.reGetGames.bind(this));
  }
  reGetGames(){
    UserVoteActions.getGames();
  }
  setTable(){
    this.setState({
      tableLoded: true,
      gameTable : UserVoteStore.games.map(game =>
        <tr key={game.gameId}>
            <td><input onChange={this.userSelected.bind(this)} type="checkbox"
              id={"gameId" + game.gameId}></input></td>

            <td><lable for={"gameId" + game.gameId}>{game.name}</lable></td>
        </tr>
      )
    });
  }
  userSelected(e){
    let gameId = e.target.id.substring("gameId".length);
    for (var i = 0; i < UserVoteStore.games.length; i++) {
      if(UserVoteStore.games[i].gameId == gameId){
        UserVoteStore.games[i].checked = !UserVoteStore.games[i].checked;
      }
    }
  }
  deleteGames(){
    AdminActions.deleteGames(UserVoteStore.games);
  }
  render() {
    return(
      <div class="gameTable floatRight clearFloat">
        <form>
          <table>
          <tbody>
              <tr>
                <th>Select</th>
                <th>Game</th>
              </tr>
              {this.state.tableLoded?this.state.gameTable:null}
              </tbody>
          </table>
          <input type="button" value="delete" onClick={this.deleteGames.bind(this)}></input>
        </form>
      </div>
    )
  }
}
