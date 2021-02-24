import React, { Component } from "react";
import "./Result.css";
import { Button } from "react-bootstrap";
import Loader from "../../Loader";

const BookIcon = require("../../images/bookIcon.png");

export default class Result extends Component {
  renderResults = () => {
    if (this.props.results !== "") {
      if (this.props.results.length === 0) {
        return <h2>No results</h2>;
      } else {
        var listOfTitles = [];
        this.props.results.forEach((title, i) => {
          listOfTitles.push(
            <div key={i}>
              <Button
                className="results__link"
                href="#"
                onClick={() => this.props.selectResult(i)}
              >
                <img src={BookIcon} className="bookIcon" alt="book icon" />
                <div className="titles">{title}</div>
              </Button>
            </div>
          );
        });
        return listOfTitles;
      }
    } else {
      return null;
    }
  };

  render() {
    while (this.props.loaderActive) {
      return <Loader />;
    }
    if (this.props.display) {
      return <div className="result_list">{this.renderResults()}</div>
    } else {
      return null;
    }
  }
}
