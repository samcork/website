import React, { Component } from "react";
import { Button, FormGroup, FormControl, Alert } from "react-bootstrap";
import "./Register.css";
import axios from "axios";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      forename: "",
      surname: "",
      email: "",
      username: "",
      password: "",
      password2: "",
      result: "",
      alertType: ""
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
    const {
      forename,
      surname,
      email,
      username,
      password,
      password2
    } = this.state;
    const access_token = "concertina";
    event.preventDefault();
    axios
      .post("/people", {
        forename,
        surname,
        email,
        username,
        password,
        password2,
        access_token
      })
      .then(res => {
        this.props.formToggler();
        this.props.successReg();
      })
      .catch(err => {
        if (err.response) {
          this.setState({ result: err.response.data, alertType: "danger" });
        } else {
          this.setState({
            result: "No response from server.",
            alertType: "danger"
          });
        }
      });
  };

  alertText = () => {
    if (this.props.showRegAlert) {
      if (!this.state.result) {
        return null;
      } else {
        return (
          <Alert bsStyle={this.state.alertType}>
            <strong>{this.state.result}</strong>
          </Alert>
        );
      }
    } else {
      return null;
    }
  };

  render() {
    if (this.props.display === false) {
      return (
        <div className="registerForm">
          <h2 className="formTitle">Nice to meet you!</h2>
          {this.alertText()}
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="forename">
              <FormControl
                autoFocus
                type="text"
                onChange={this.handleChange}
                placeholder="Forename"
                required
              />
            </FormGroup>
            <FormGroup controlId="surname">
              <FormControl
                autoFocus
                type="text"
                onChange={this.handleChange}
                placeholder="Surname"
                required
              />
            </FormGroup>
            <FormGroup controlId="email">
              <FormControl
                autoFocus
                type="email"
                onChange={this.handleChange}
                placeholder="Email"
                required
              />
            </FormGroup>
            <FormGroup controlId="username">
              <FormControl
                autoFocus
                type="text"
                onChange={this.handleChange}
                placeholder="Username"
                required
              />
            </FormGroup>
            <FormGroup controlId="password">
              <FormControl
                autoFocus
                onChange={this.handleChange}
                type="password"
                placeholder="Password"
                required
              />
            </FormGroup>
            <FormGroup controlId="password2">
              <FormControl
                autoFocus
                onChange={this.handleChange}
                type="password"
                placeholder="Confirm Password"
                required
              />
            </FormGroup>
            <Button
              onClick={this.props.alertToggler}
              type="submit"
              bsStyle="success"
              bsSize="large"
              className="regBut2"
            >
              Register
            </Button>
            <Button
              bsSize="large"
              onClick={this.props.formToggler}
              bsStyle="primary"
              className="logBut2"
            >
              Login
            </Button>
          </form>
        </div>
      );
    } else {
      return null;
    }
  }
}
