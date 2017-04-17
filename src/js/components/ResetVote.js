import React from "react";
import { IndexLink, Link } from "react-router";
import * as AdminActions from "../actions/AdminActions";
import AdminStore from "../stores/AdminStore";

export default class RestartVote extends React.Component {
  constructor() {
    super();
    this.state = {
      sure: false
    }
  }
  componentWillMount() {
    AdminStore.on("VOTE_RESET", this.voteHasBeenRest.bind(this));
  }
  componentWillUnmount() {
    AdminStore.removeListener("VOTE_RESET", this.voteHasBeenRest.bind(this));
  }
  voteHasBeenRest(){
    this.setState({
      sure:false
    });
  }
  resetVoteOne(e){
    this.setState({
      sure:true
    });
  }
  resetVote(e){
    AdminActions.resetVote();
  }
  render() {
    return(
      <div>
        <form>
        {this.state.sure?
          <input type="button" value="Are You Sure?" onClick={this.resetVote.bind(this)}></input>
          :
          <input type="button" value="Reset Vote" onClick={this.resetVoteOne.bind(this)}></input>}
        </form>
      </div>
    )
  }
}
