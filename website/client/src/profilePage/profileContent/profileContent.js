import React, { Component } from "react";
import profilePic from "../../images/profile.png";
import { Button } from "react-bootstrap";
import "./profileContent.css";

export default class ProfileContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="profileArea">
        <div className="profilePic">
          <img src={profilePic} alt={"profilePic"} />
        </div>
        <div className="profileText">
          <b>Username:</b> {this.props.username}
          <br />
          <b>Name:</b> {this.props.forename} {this.props.surname}
          <br />
          <b>Email:</b> {this.props.email}
        </div>
        <Button bsStyle="danger" className="delAccount" onClick={() => {this.props.deleteAccount(this.props.username)}}>
          <b>DELETE ACCOUNT</b>
        </Button>
      </div>
    );
  }
}
