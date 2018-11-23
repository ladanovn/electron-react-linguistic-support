import React, { Component } from "react";
import { Porter } from "../../libs/porter";
import { Table, Form, Dropdown } from "semantic-ui-react";

import { dropdownOptions, sorting } from "../../libs/sort";

class Stemming extends Component {
  componentWillMount() {
    const porter = new Porter();

    const newState = JSON.parse(JSON.stringify(this.props.state));
    newState.data.stemmedWords = porter.stemAll(this.props.state.data.words);
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
              newState.data.stemmedWords = sorting[event.value](
                newState.data.stemmedWords
              );

              this.props.changeState(newState);
            }}
          />
        </Form.Field>
        <Form.Field>
          <Table>
            <Table.Body>
              {this.props.state.data.stemmedWords.map((word, index) => {
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

export default Stemming;
