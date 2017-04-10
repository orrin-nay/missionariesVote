import React from "react";

export default class UserInfoForm extends React.Component {
  handleNext(){
    this.props.hideUserInfo();
  }
    render() {
        return(
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
            <input type="button" id="next" value="next >>" onClick={this.handleNext.bind(this)}></input>
          </form>
        );
      }
    };
