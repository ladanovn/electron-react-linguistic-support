import React, { Component } from "react";
import { Table, Form } from "semantic-ui-react";

class Grouping extends Component {
  componentWillMount() {
    const newState = JSON.parse(JSON.stringify(this.props.state));
    const groupedWords = [];
    this.props.state.data.stemmedWords.forEach(word => {
      const existingWordId = groupedWords.findIndex(el => el.value === word);
      if (existingWordId !== -1) groupedWords[existingWordId].count += 1;
      else
        groupedWords.push({
          value: word,
          count: 1
        });
    });
    newState.data.groupedWords = groupedWords.sort((a, b) => b.count - a.count);
    this.props.changeState(newState);
  }

  render() {
    return (
      <Form>
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

export default Grouping;
