import React, { Component } from "react";
import { Button, Form, FormGroup, FormControl } from "react-bootstrap";
import axios from "axios";
import "./Search.css";

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      searchRes: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { search } = this.state;

    axios
      .post("/search", { search } )
      .then(res => {
        this.props.searchRes(res);
      })
      .catch(err => {
        console.log(err)
      });
  };

  render() {
    return (
      <div className="search">
        <Form inline onSubmit={this.handleSubmit}>
          <FormGroup controlId="search">
            <FormControl
              autoFocus
              onChange={this.handleChange}
              placeholder="Search for a story..."
              type="text"
              required
            />
          </FormGroup>
          <Button
            type="submit"
            bsStyle="success"
            bsSize="large"
            className="searchBut"
          >
            Search
          </Button>
        </Form>
      </div>
    );
  }
}
