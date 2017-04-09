import React from "react";
import { IndexLink, Link } from "react-router";
import UserVoteForm from "../components/forms/UserVoteForm";

export default class index extends React.Component {
  render() {
    return (
      <div>
        <h2 class="floatRight small"><Link to="admin">Admin Login</Link></h2>
        <h1>Missionary Game Vote</h1>
        <img src="imgs/imgres.png" class="floatRight clearFloat" height="194" width="259"></img>
        <UserVoteForm />
       </div>
    );
  }
}
