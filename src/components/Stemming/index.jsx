import React, { Component } from "react";
import { Porter } from "./Porter";

class Stemming extends Component {
  componentWillMount() {
    Porter.stemWord("Пригородный");
  }
  render() {
    return <section>Стемминг</section>;
  }
}

export default Stemming;
