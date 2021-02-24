import React, { Component } from "react";
import "./Story.css";

export default class Story extends Component {
  render() {
    if (this.props.title !== "" && this.props.display) {
      return (
        <div className="storyDisplay">
          <div className="storyTitle">
            <b> {this.props.title} <br />
            By {this.props.author}</b> <br />
            <br />
          </div>
          <p className="storyText">{this.props.text}</p>
        </div>
      );
    } else {
      return null;
    }
  }
}
