import React from "react";
import { IndexLink, Link } from "react-router";
import UserVoteForm from "../components/UserVoteForm";
import BarGraph from "../components/BarGraph";

export default class index extends React.Component {
  render() {
    return (
      <div>
        <h2 class="floatRight small"><Link to="admin">Admin Login</Link></h2>
        <h1>Missionary Game Vote</h1>
        <h3>Your vote will not be counted if you don't give your whole name.</h3>
        <div width="370" class="floatRight clearFloat">
          <BarGraph/>
        </div>
        <UserVoteForm />
       </div>
    );
  }
}
