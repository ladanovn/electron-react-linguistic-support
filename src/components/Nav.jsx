import React, { Component } from "react";
import { Link } from "react-router-dom";

class Nav extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li>
            <Link to="/loader">Loader</Link>
          </li>
          <li>
            <Link to="/cleaner">Cleaner</Link>
          </li>
          <li>
            <Link to="/spliter">Spliter</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
