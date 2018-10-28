import React, { Component } from "react";

import Intro from "./Intro";
import Loader from "./Loader";
import Cleaner from "./Cleaner";
import Spliter from "./Spliter";

import { Tab } from "semantic-ui-react";

const panes = [
  {
    menuItem: "Intro",
    render: () => (
      <Tab.Pane>
        <Intro />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Loader",
    render: () => (
      <Tab.Pane>
        <Loader />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Cleaner",
    render: () => (
      <Tab.Pane>
        <Cleaner />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Spliter",
    render: () => (
      <Tab.Pane>
        <Spliter />
      </Tab.Pane>
    )
  }
];

class Main extends Component {
  render() {
    return (
      <Tab
        menu={{ fluid: true, vertical: true, tabular: true }}
        panes={panes}
      />
    );
  }
}

export default Main;
