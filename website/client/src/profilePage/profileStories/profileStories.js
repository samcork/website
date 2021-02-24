import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./profileStories.css";

export default class ProfileStories extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderStories = () => {
    var listOfTitles = [];
    if (this.props.stories === undefined) {
      return null;
    } else {
      this.props.stories.forEach((story, i) => {
        listOfTitles.push(
          <div key={i}>
            <div className="singleStory">
              {story.title}
              <Button
                bsStyle="danger"
                className="delStory"
                onClick={() => this.props.deleteStory(story.title)}
              >
                DELETE
              </Button>
            </div>
          </div>
        );
      });
      return listOfTitles;
    }
  };

  render() {
    while (this.props.stories === "") {
      return null;
    }
    return <div className="profileStories">{this.renderStories()}</div>;
  }
}
