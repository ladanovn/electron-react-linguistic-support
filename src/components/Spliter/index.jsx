import React, { Component } from "react";
import { Table } from "semantic-ui-react";

class Spliter extends Component {
  render() {
    return (
      <Table>
        <Table.Body>
          {this.props.state.data.clearedText.split(" ").map((word, index) => {
            return (
              <Table.Row key={index}>
                <Table.Cell>{word}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    );
  }
}

export default Spliter;
