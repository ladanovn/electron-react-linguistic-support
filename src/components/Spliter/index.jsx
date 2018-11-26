import React, { Component } from "react";
import { Table, Form, Dropdown } from "semantic-ui-react";

import { dropdownOptions, sorting } from "../../libs/sort";

class Spliter extends Component {
  componentDidMount() {
    const newState = JSON.parse(JSON.stringify(this.props.state));
    newState.data.words = this.props.state.data.clearedText
      .split(" ")
      .filter(word => word !== "");
    this.props.changeState(newState);
  }

  render() {
    return (
      <Form>
        <Form.Field>
          <Dropdown
            options={dropdownOptions}
            defaultValue={dropdownOptions[0].value}
            onChange={(_, event) => {
              const newState = JSON.parse(JSON.stringify(this.props.state));
              newState.data.words = sorting[event.value](newState.data.words);

              this.props.changeState(newState);
            }}
          />
        </Form.Field>
        <Form.Field>
          <Table>
            <Table.Body>
              {this.props.state.data.words.map((word, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell>{word}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </Form.Field>
      </Form>
    );
  }
}

export default Spliter;
