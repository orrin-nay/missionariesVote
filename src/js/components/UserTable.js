import React from "react";
import { IndexLink, Link } from "react-router";
import * as AdminActions from "../actions/AdminActions";
import AdminStore from "../stores/AdminStore";

export default class UserTable extends React.Component {
  constructor() {
    super();
    this.state = {
      showErrorMsg: false,
      errorMsg: "",
      userTable: "",
      tableLoded: false
    };
  }
  componentWillMount() {
    AdminStore.on("USERS_RECIVED", this.setTable.bind(this));
    AdminActions.getUsers();
  }
  componentWillUnmount() {
    AdminStore.removeListener("USERS_RECIVED", this.setTable.bind(this));
  }
  setTable(){
    this.setState({
      tableLoded: true,
      userTable : AdminStore.users.map(user =>
        <tr key={user.userId}>
            <td><input onChange={this.userSelected.bind(this)} type="checkbox"
              id={"userId" + user.userId}></input></td>

            <td><lable for={"userId" + user.userId}>{user.name}</lable></td>
        </tr>
      )
    });
  }
  userSelected(e){
    let userId = e.target.id.substring("userId".length);
    for (var i = 0; i < AdminStore.users.length; i++) {
      if(AdminStore.users[i].userId == userId){
        AdminStore.users[i].checked = !AdminStore.users[i].checked;
      }
    }
  }
  deleteUsers(){
    AdminActions.deleteUsers(AdminStore.users);
  }
  render() {
    return(
      <div>
        <form>
          <table>
          <tbody>
              <tr>
                <th>Select</th>
                <th>Name</th>
              </tr>
              {this.state.tableLoded?this.state.userTable:null}
              </tbody>
          </table>
          <input type="button" value="delete" onClick={this.deleteUsers.bind(this)}></input>
        </form>
      </div>
    )
  }
}
