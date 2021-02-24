import React, { Component } from "react";
import { Button, FormGroup, FormControl, Alert } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import "./Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
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
    event.preventDefault();
    const { username, password } = this.state;

    axios
      .post("/login", { username, password })
      .then(res => {
        window.localStorage.setItem('Token', res.data.token);
        window.location = "/main";
      })
      .catch(err => {
        if (err.response) {
          this.setState({
            result: err.response.data,
            alertType: "danger"
          });
        } else {
          this.setState({ result: "No response from server." });
        }
      });
  };

  resetForm = () => {
    this.setState({
      username: "",
      password: "",
      result: "",
      alertType: ""
    });
  }

  alertText = () => {
    if (this.props.showReg) {
      return (
        <Alert bsStyle="success">
          <strong>You have been successfully registered!</strong>
        </Alert>
      );
    } else if (this.props.showLogAlert) {
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
    if (this.props.display === true) {
      return (
        <div className="loginForm">
          <h2 className="formTitle">Login</h2>
          {this.alertText()}
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="username">
              <FormControl
                autoFocus
                onChange={this.handleChange}
                placeholder="Username"
                type="text"
                required
              />
            </FormGroup>
            <FormGroup controlId="password">
              <FormControl
                autoFocus
                onChange={this.handleChange}
                placeholder="Password"
                type="password"
                required
              />
            </FormGroup>
            <Router />
            <Button
              onClick={this.props.alertToggler}
              type="submit"
              bsStyle="success"
              bsSize="large"
              className="logBut"
            >
              Login
            </Button>
            <Button
              bsSize="large"
              onClick={this.props.formToggler}
              bsStyle="primary"
              className="regBut"
            >
              Register
            </Button>
          </form>
        </div>
      );
    } else {
      return null;
    }
  }
}
