import React, { Component } from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";
import "./App.css";

class App extends Component {
  state = {
    showLogin: true,
    showRegAlert: false,
    showLogAlert: false,
    data: null,
    showRegSuccess: false
  };

  successReg = () => {
    this.setState({ showLogAlert: true });
    this.setState({ showRegSuccess: true });
  }

  toggleForm = () => {
    if (this.state.showLogin === true) {
      this.setState({ showLogin: false });
    } else {
      this.setState({ showLogin: true });
    }
    this.setState({ showLogAlert: false });
    this.setState({ showRegAlert: false });
  };

  toggleLogAlert = () => {
    this.setState({ showRegSuccess: false });
    this.setState({ showLogAlert: true });
  };

  toggleRegAlert = () => {
    this.setState({ showRegAlert: true });
  };

  render() {
    return (
      <div className="loginPage">
        <div className="introArea">Emaginate</div>
        <Login //Show Log Form
          display={this.state.showLogin}
          formToggler={this.toggleForm} //Show Alerts
          showLogAlert={this.state.showLogAlert}
          alertToggler={this.toggleLogAlert}
          showReg={this.state.showRegSuccess}
        />
        <Register //Show Reg Form
          display={this.state.showLogin}
          formToggler={this.toggleForm} //Show Alerts
          showRegAlert={this.state.showRegAlert}
          alertToggler={this.toggleRegAlert}
          successReg={this.successReg}
        />
      </div>
    );
  }
}

export default App;
