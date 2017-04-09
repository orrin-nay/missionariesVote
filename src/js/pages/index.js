import React from "react";
    import { IndexLink, Link } from "react-router";


    export default class index extends React.Component {
      render() {
        return (
          <div>
  <h2 class="floatRight small"><Link to="admin">Admin Login</Link></h2>
  <h1>Missionary Game Vote</h1>
  <img src="imgs/imgres.png" class="floatRight clearFloat" height="194" width="259"></img>
  <form>
    <label for="name">Name</label>
    <br>
    <input type="text" id="name"></input>
    <br>

    <label for="email">Email(optional)</label>
    <br>
    <input type="email" id="email"></input>
    <br>

    <label for="phone">Phone(optional)</label>
    <br>
    <input type="tel" id="phone"></input>

    <br>
    <input type="button" id="next" value="next"></input>

<script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.js"></script>    </div>
              );
            }
          }