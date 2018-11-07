import React, { Component } from "react";

import Loader from "./Loader";
import Cleaner from "./Cleaner";
import Spliter from "./Spliter";
import Stemming from "./Stemming";
import Grouping from "./Grouping";
import WeightCoefficient from "./WeightCoefficient";
import Relevance from "./Relevance";

import { Tab } from "semantic-ui-react";

class Main extends Component {
  constructor(params) {
    super(params);

    this.panes = [
      {
        menuItem: "Загрузка",
        render: () => (
          <Tab.Pane>
            <Loader
              state={this.props.state}
              changeState={this.props.changeState}
            />
          </Tab.Pane>
        )
      },
      {
        menuItem: "Очистка",
        render: () => (
          <Tab.Pane>
            <Cleaner
              state={this.props.state}
              changeState={this.props.changeState}
            />
          </Tab.Pane>
        )
      },
      {
        menuItem: "Разделение на слова",
        render: () => (
          <Tab.Pane>
            <Spliter
              state={this.props.state}
              changeState={this.props.changeState}
            />
          </Tab.Pane>
        )
      },
      {
        menuItem: "Стемминг",
        render: () => (
          <Tab.Pane>
            <Stemming
              state={this.props.state}
              changeState={this.props.changeState}
            />
          </Tab.Pane>
        )
      },
      {
        menuItem: "Группировка",
        render: () => (
          <Tab.Pane>
            <Grouping
              state={this.props.state}
              changeState={this.props.changeState}
            />
          </Tab.Pane>
        )
      },
      {
        menuItem: "Весовые коэффициенты",
        render: () => (
          <Tab.Pane>
            <WeightCoefficient
              state={this.props.state}
              changeState={this.props.changeState}
            />
          </Tab.Pane>
        )
      },
      {
        menuItem: "Вычисление релевантности",
        render: () => (
          <Tab.Pane>
            <Relevance
              state={this.props.state}
              changeState={this.props.changeState}
            />
          </Tab.Pane>
        )
      }
    ];
  }
  render() {
    return (
      <Tab
        menu={{ fluid: true, vertical: true, tabular: true, pointing: true }}
        panes={this.panes}
      />
    );
  }
}

export default Main;
