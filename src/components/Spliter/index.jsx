import React, { Component } from "react";
import { Table, Form, Dropdown } from "semantic-ui-react";

const typeSort = [
  {
    text: "Без сортировки",
    value: "withoutSorting"
  },
  {
    text: "По возростанию с начала",
    value: "ascendingFromBeginning"
  },
  {
    text: "По убыванию с начала",
    value: "descendingFromBeginning"
  },
  {
    text: "По возростанию с конца",
    value: "asceningFromEnding"
  },
  {
    text: "По убыванию с конца",
    value: "descendingFromEnding"
  }
];

class Spliter extends Component {
  componentDidMount() {
    const newState = JSON.parse(JSON.stringify(this.props.state));
    newState.data.words = this.props.state.data.clearedText.split(" ");
    this.props.changeState(newState);
  }

  render() {
    return (
      <Form>
        <Form.Field>
          <Dropdown
            options={typeSort}
            defaultValue={typeSort[0].value}
            onChange={(_, event) => {
              const newState = JSON.parse(JSON.stringify(this.props.state));
              switch (event.value) {
                case "ascendingFromBeginning":
                  newState.data.words = this.props.state.data.words.sort(
                    (a, b) => {
                      return a.localeCompare(b);
                    }
                  );
                  break;
                case "descendingFromBeginning":
                  newState.data.words = this.props.state.data.words.sort(
                    (a, b) => {
                      return b.localeCompare(a);
                    }
                  );
                  break;
                case "asceningFromEnding":
                  newState.data.words = this.props.state.data.words.sort(
                    (a, b) => {
                      const rev_a = a
                        .split("")
                        .reverse()
                        .join("");
                      const rev_b = b
                        .split("")
                        .reverse()
                        .join("");
                      return rev_a.localeCompare(rev_b);
                    }
                  );
                  break;
                case "descendingFromEnding":
                  newState.data.words = this.props.state.data.words.sort(
                    (a, b) => {
                      const rev_a = a
                        .split("")
                        .reverse()
                        .join("");
                      const rev_b = b
                        .split("")
                        .reverse()
                        .join("");
                      return rev_b.localeCompare(rev_a);
                    }
                  );
                  break;
                default:
                  break;
              }
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
