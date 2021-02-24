import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./Menu.css";

export default class Menu extends Component {
  showSettings(event) {
    event.preventDefault();
  }

  render() {
    return (
      <header class="header">
        <Link to="/main">
          <a href="/main" className="logo">
            Emaginate
          </a>
        </Link>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="menu-icon" for="menu-btn">
          <span className="navicon" />
        </label>
        <Router />
        <ul class="menu">
          <li>
            <Link to="/main"><b>Read</b></Link>
          </li>
          <li>
            <Link to="/write"><b>Write</b></Link>
          </li>
          <li>
            <Link to="/profile"><b>Profile</b></Link>
          </li>
          <li>
            <Link to="/"><b>Logout</b></Link>
          </li>
        </ul>
      </header>
      //     <div>
      //       <input class="menu-btn" type="checkbox" id="menu-btn" />
      //       <label class="menu-icon" for="menu-btn">
      //         <span class="navicon" />
      //       </label>
      //       <ul class="menu">
      // <Link to="/main">
      //   <li>
      //     <a>Read</a>
      //   </li>
      // </Link>
      // <Link to="/write">
      //   <li>
      //     <a>Write</a>
      //   </li>
      // </Link>
      // <Link to="/profile">
      //   <li>
      //     <a>Profile</a>
      //   </li>
      // </Link>
      // <Link to="/">
      //   <li>
      //     <a>Logout</a>
      //   </li>
      // </Link>
      //       </ul>
      //     </div>
    );
  }
}
