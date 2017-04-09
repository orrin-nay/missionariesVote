import React from "react";
    import { IndexLink, Link } from "react-router";


    export default class admin extends React.Component {
      render() {
        return (
          <div>
  <h2 class="floatRight small"><IndexLink to="/">Back</IndexLink></h2>
  <h1>Admin Login</h1>
  <form>
    <label for="username">Username</label>
    <br>
    <input type="text" id="username"></input>
    <br>

    <label for="name">Password</label>
    <br>
    <input type="password" id="name"></input>
    <br>

    <br>
    <input type="button" id="next" value="next"></input>

<script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.js"></script>    </div>
              );
            }
          }