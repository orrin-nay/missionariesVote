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
              <br></br>
              <input type="text" id="username"></input>
              <br></br>

              <label for="name">Password</label>
              <br></br>
              <input type="password" id="name"></input>
              <br></br>

              <br></br>
              <input type="button" id="next" value="next"></input>
            </form>
          </div>
              );
            }
          }
