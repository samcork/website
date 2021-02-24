import React, { Component } from "react";
import Menu from "../../Menu/Menu.js";
import ProfileContent from "../profileContent/profileContent";
import ProfileStories from "../profileStories/profileStories";
import axios from "axios";
import "./Profile.css";

export default class Profile extends Component {
  state = {
    username: "",
    forename: "",
    surname: "",
    email: "",
    stories: ""
  };

  componentDidMount() {
    const username = window.localStorage.getItem("Token");

    //####################################################1
    axios
      .get(`/people/${username}`)
      .then(res => {
        var details = res.data;
        this.setState({
          username: details.username,
          forename: details.forename,
          surname: details.surname,
          email: details.email
        });
      })
      .catch(err => {
        console.log(err);
      });

    var search = username;
    axios
      .post("/search", { search })
      .then(res => {
        this.setState({ stories: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteStory = story => {
    axios
      .delete(`/profile/${story}`)
      .then(res => {
        this.setState({ stories: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  deleteAccount = username => {
    axios
      .delete(`/people/${username}`)
      .then(res => {
        window.location = "/";
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="profile">
        <div className="container">
          <div className="head">
            <Menu />
          </div>
          <div className="contentArea">
            <ProfileContent
              username={this.state.username}
              forename={this.state.forename}
              surname={this.state.surname}
              email={this.state.email}
              deleteAccount={this.deleteAccount}
            />
            <h1 className="yourStories">Your Stories</h1>
            <ProfileStories
              stories={this.state.stories}
              deleteStory={this.deleteStory}
            />
          </div>
        </div>
      </div>
    );
  }
}
