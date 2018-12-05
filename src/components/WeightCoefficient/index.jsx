import React, { Component } from "react";
import { Table, Form } from "semantic-ui-react";

class WeightCoefficient extends Component {
  componentWillMount() {
    const newState = JSON.parse(JSON.stringify(this.props.state));
    this.props.state.data.weightCoef = [
      { width: 1, words: newState.data.groupedWords.slice(0, 4) },
      { width: 2, words: newState.data.groupedWords.slice(4, 10) },
      { width: 3, words: newState.data.groupedWords.slice(10, 20) }
    ];
  }

  render() {
    return (
      <Form>
        <Form.Field>
          <Table>
            <Table.Body>
              {this.props.state.data.groupedWords
                .slice(0, 20)
                .map((words, index) => {
                  return (
                    <Table.Row key={index}>
                      <Table.Cell>{words.value}</Table.Cell>
                      <Table.Cell>{words.count}</Table.Cell>
                      <Table.Cell>
                        {index < 4
                          ? "1  категория"
                          : index < 10
                          ? "2  категория"
                          : "3  категория"}
                      </Table.Cell>
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
