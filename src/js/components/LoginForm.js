import React from "react";
import { IndexLink, Link } from "react-router";
import * as AdminActions from "../actions/AdminActions";
import AdminStore from "../stores/AdminStore";

export default class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      showErrorMsg: false,
      errorMsg: ""
    };
  }
  componentWillMount() {
    AdminStore.on("NO_USER_NAME", this.noUsername.bind(this));
    AdminStore.on("NO_PASSWORD", this.noPassword.bind(this));
    AdminStore.on("INVALID_PASSWORD_OR_USERNAME", this.invalidPasswordOrUsername.bind(this));
  }
  componentWillUnmount() {
    AdminStore.removeListener("NO_USER_NAME", this.noUsername.bind(this));
    AdminStore.removeListener("NO_PASSWORD", this.noPassword.bind(this));
    AdminStore.removeListener("INVALID_PASSWORD_OR_USERNAME", this.invalidPasswordOrUsername.bind(this));
  }
  sendLogin(){
    AdminActions.sendLogin(this.username, this.password);
  }
  passwordChange(e){
    this.password = e.target.value;
  }
  usernameChange(e){
    this.username = e.target.value;
  }
  noUsername(){
    this.setState({
      showErrorMsg: true,
      errorMsg: "No username"
    });
  }
  noPassword(){
    this.setState({
      showErrorMsg: true,
      errorMsg: "No password"
    });
  }
  invalidPasswordOrUsername(){
    this.setState({
      showErrorMsg: true,
      errorMsg: "Invalid username or password"
    });
  }
  render() {
    return(
      <div>
        <form>
          <p class="error">{this.state.showErrorMsg?this.state.errorMsg:null}</p>
          <label for="username">Username</label>
          <br></br>
          <input type="text" id="username" onChange={this.usernameChange.bind(this)}></input>
          <br></br>

          <label for="passowrd">Password</label>
          <br></br>
          <input type="password" id="passowrd" onChange={this.passwordChange.bind(this)}></input>
          <br></br>

          <br></br>
          <input type="button" id="next" value="next" onClick={this.sendLogin.bind(this)}></input>
        </form>
      </div>
    )
  }
}
