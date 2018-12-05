import React, { Component } from "react";
import { Table, Form, Dropdown } from "semantic-ui-react";

import { dropdownOptions, sorting } from "../../libs/sort";

class WeightCoefficient extends Component {
  componentWillMount() {
    const newState = JSON.parse(JSON.stringify(this.props.state));
    const groupedWords = [];
    this.props.state.data.stemmedWords.forEach(word => {
      const existingWordId = groupedWords.findIndex(el => el.value === word);
      if (existingWordId !== -1) groupedWords.count +=1
      else groupedWords.push({
        value: word,
        count: 1
      })
    });
    newState.data.groupedWords = groupedWords;
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
              newState.data.groupedWords = sorting[event.value](
                newState.data.groupedWords
              );

              this.props.changeState(newState);
            }}
          />
        </Form.Field>
        <Form.Field>
          <Table>
            <Table.Body>
              {this.props.state.data.groupedWords.map((words, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell>{words.value}</Table.Cell>
                    <Table.Cell>{words.count}</Table.Cell>
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

export default WeightCoefficient;
