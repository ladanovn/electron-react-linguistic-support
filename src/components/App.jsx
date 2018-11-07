import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import Main from "./Main";

class App extends Component {
  constructor() {
    super();

    this.state = {
      data: {
        fullText: "",
        cleanedText: "",
        words: [],
        stemmedWords: [],
        groupedWords: [],
        weightCoef: [
          {
            width: 1,
            words: []
          },
          {
            width: 2,
            words: []
          },
          {
            width: 3,
            words: []
          }
        ]
      }
    };
  }

  changeState(newState) {
    console.log(newState);
    this.setState(newState);
  }

  render() {
    return (
      <div className="App">
        <Main state={this.state} changeState={this.changeState.bind(this)} />
      </div>
    );
  }
}

export default App;
