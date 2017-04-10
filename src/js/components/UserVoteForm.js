import React from "react";

import * as UserVoteActions from "../actions/UserVoteActions";
import UserVoteStore from "../stores/UserVoteStore";
import UserInfoForm from "./forms/UserInfoForm"

export default class UserVoteForm extends React.Component {
  constructor() {
    super();
    this.state = {
      showUserInfo: true,
    };
  }
  hideUserInfo(){
    this.setState({showUserInfo: false});
    UserVoteActions.sendUserInfo();
  }
  render() {
        return(
          <div>
            {this.state.showUserInfo?<UserInfoForm hideUserInfo={this.hideUserInfo.bind(this)} />:null}
          </div>
        );
      }
    };
