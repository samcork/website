import React from "react";
import ReactDOM from "react-dom";
import App from "./loginPage/App/App";
import Main from "./mainPage/Main/Main";
import Profile from "./profilePage/Profile/Profile";
import Write from "./writePage/Write/Write";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" render={() => <App/>} />
      <Route path="/main" component={Main} />
      <Route path="/write" component={Write} />
      <Route path="/profile" component={Profile} />
    </div>
  </Router>,
  document.getElementById("root")
);
