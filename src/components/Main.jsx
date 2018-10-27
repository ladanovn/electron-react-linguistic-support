import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Intro from "./Intro";
import Loader from "./Loader";
import Cleaner from "./Cleaner";
import Spliter from "./Spliter";

class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route path="/" component={Intro} />
          <Route path="/loader" component={Loader} />
          <Route path="/cleaner" component={Cleaner} />
          <Route path="/spliter" component={Spliter} />
        </Switch>
      </main>
    );
  }
}
export default Main;
