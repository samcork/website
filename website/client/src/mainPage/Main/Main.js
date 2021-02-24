import React, { Component } from "react";
import Menu from "../../Menu/Menu.js";
import Search from "../Search/Search.js";
import Result from "../Result/Result.js";
import Story from "../Story/Story.js";
import "./Main.css";

export default class Main extends Component {
  state = {
    storyActive: false,
    resultActive: false,
    loaderActive: false,
    allRes: "",
    searchRes: "",
    title: "",
    author: "",
    text: ""
  };

  toggleLoader = () => {
    if (this.state.loaderActive) {
      this.setState({ loaderActive: false });
    } else {
      this.setState({ loaderActive: true });
    }
  };

  searchRes = val => {
    this.setState({ storyActive: false });
    this.setState({ resultActive: true });
    this.setState({ allRes: val });
    this.toggleLoader();
    setTimeout(() => {
      var resultTitles = [];
      val.data.forEach(element => {
        resultTitles.push(element.title);
      });
      this.setState({ searchRes: resultTitles });
      this.toggleLoader();
    }, 1000);
  };

  selectResult = num => {
    this.setState({ resultActive: false });
    this.setState({ storyActive: true });
    var selected = this.state.allRes.data[num];
    this.setState({
      title: selected.title,
      author: selected.author,
      text: selected.text
    });
  };

  render() {
    return (
      <div className="main">
        <div className="container">
          <div className="head">
            <Menu />
          </div>
          <div className="contentArea">
            <Search searchRes={this.searchRes} />
            <Result
              selectResult={this.selectResult}
              results={this.state.searchRes}
              loaderActive={this.state.loaderActive}
              toggleLoader={this.toggleLoader}
              display={this.state.resultActive}
            />
            <Story
              title={this.state.title}
              author={this.state.author}
              text={this.state.text}
              display={this.state.storyActive}
            />
          </div>
        </div>
      </div>
    );
  }
}
