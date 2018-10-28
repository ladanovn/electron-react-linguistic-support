import React, { Component } from "react";

import Loader from "./Loader";
import Cleaner from "./Cleaner";
import Spliter from "./Spliter";
import Stemming from "./Stemming";
import Grouping from "./Grouping";
import WeightCoefficient from "./WeightCoefficient";
import Relevance from "./Relevance";

import { Tab } from "semantic-ui-react";

const panes = [
  {
    menuItem: "Загрузка",
    render: () => (
      <Tab.Pane>
        <Loader />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Очистка",
    render: () => (
      <Tab.Pane>
        <Cleaner />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Разделение на слова",
    render: () => (
      <Tab.Pane>
        <Spliter />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Стемминг",
    render: () => (
      <Tab.Pane>
        <Stemming />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Группировка",
    render: () => (
      <Tab.Pane>
        <Grouping />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Весовые коэффициенты",
    render: () => (
      <Tab.Pane>
        <WeightCoefficient />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Вычисление релевантности",
    render: () => (
      <Tab.Pane>
        <Relevance />
      </Tab.Pane>
    )
  }
];

class Main extends Component {
  render() {
    return (
      <Tab
        menu={{ fluid: true, vertical: true, tabular: true, pointing: true }}
        panes={panes}
      />
    );
  }
}

export default Main;
