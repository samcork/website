import React, { Component } from "react";
import { Button, FormGroup, FormControl, Alert } from "react-bootstrap";
import "./submitStory.css";
import axios from "axios";

export default class submitStory extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      storyTitle: "",
      storyText: "",
      toggleAlert: false
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { storyTitle, storyText } = this.state;
    const storyAuthor = window.localStorage.getItem("Token");
    axios
      .post("/write", {
        storyAuthor,
        storyTitle,
        storyText
      })
      .then(res => {
        this.setState({ toggleAlert: true });
      })
      .catch(err => {
        console.log(err);
      });
  };

  submitAlert = () => {
    if (this.state.toggleAlert) {
      return (
        <Alert bsStyle="success">
          <strong>Story successfully submitted!</strong>
        </Alert>
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <div className="submitArea">
        {this.submitAlert()}
        <form className="submitStory" onSubmit={this.handleSubmit}>
          <FormGroup controlId="storyTitle">
            <FormControl
              autoFocus
              onChange={this.handleChange}
              placeholder="What is the title of your story?"
              type="text"
              required
            />
          </FormGroup>
          <FormGroup controlId="storyText">
            <FormControl
              autoFocus
              componentClass="textarea"
              placeholder="Write a story..."
              onChange={this.handleChange}
              type="text"
              required
            />
          </FormGroup>
          <Button
            type="submit"
            bsStyle="success"
            bsSize="large"
            className="storyBut"
          >
            Submit Story
          </Button>
        </form>
      </div>
    );
  }
}
