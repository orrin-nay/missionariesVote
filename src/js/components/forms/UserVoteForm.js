import React from "react";

import * as UserVoteActions from "../../actions/UserVoteActions";
import UserVoteStore from "../../stores/UserVoteStore";

export default class UserVoteForm extends React.Component {
  constructor() {
    super();
    this.showUserInfo = true;
  }
  hideUserInfo(){
    this.showUserInfo = false;
    console.log("dddd");
  }
  render() {
      return(
        <div>
          {this.showUserInfo?<UserInfoForm showUserInfo={this.showUserInfo}/>:null}
        </div>
      );
    }
  };

  class UserInfoForm extends React.Component {
    render() {
      let { showUserInfo } = this.props;
        return(
          <div>
            <form>
              <label for="name">Name</label>
              <br></br>
              <input type="text" id="name"></input>
              <br></br>

              <label for="email">Email(optional)</label>
              <br></br>
              <input type="email" id="email"></input>
              <br></br>

              <label for="phone">Phone(optional)</label>
              <br></br>
              <input type="tel" id="phone"></input>

              <br></br>
              <input type="button" id="next" value="next >>" onClick={showUserInfo = false}></input>
            </form>
          </div>
        );
      }
    };
