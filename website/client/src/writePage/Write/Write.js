import React, { Component } from "react";
import Menu from "../../Menu/Menu.js";
import SubmitStory from "../submitStory/submitStory";
import "./Write.css";

export default class Main extends Component {
  state = {};

  render() {
    return (
      <div className="writeArea">
        <div className="container">
          <div className="head">
            <Menu />
          </div>

          <div className="contentArea">
            <h2>Write a short story!</h2>
            <SubmitStory />
          </div>
        </div>
      </div>
    );
  }
}
