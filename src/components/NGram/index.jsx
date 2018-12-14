import React, { Component } from "react";
import { Table, Form, Dropdown } from "semantic-ui-react";

const dropdownOptions = [
  {
    text: "Трехбуквенная N-грамма",
    value: 3
  },
  {
    text: "Четырехбуквенная N-грамма",
    value: 4
  },
  {
    text: "Пятибуквенная N-грамма",
    value: 5
  }
];

function getNGrams(n) {
  const srcText = this.props.state.data.fullText;
  const clrText = srcText.replace(/[^A-ZА-Я]/gi, "").toLowerCase();
  const ngrams = [];

  for (let i = 0; i < clrText.length - n + 1; i++) {
    const gram = clrText.slice(i, i + n);

    if (ngrams[gram]) ngrams[gram] += 1;
    else ngrams[gram] = 1;

    const existNgram = ngrams.findIndex(el => el.value === gram);

    if (existNgram !== -1) ngrams[existNgram].count += 1;
    else ngrams.push({ value: gram, count: 1 });
  }

  const newState = JSON.parse(JSON.stringify(this.props.state));
  newState.data.ngrams = ngrams.sort((a, b) => b.count - a.count);
  this.props.changeState(newState);
}

class NGram extends Component {
  componentDidMount() {
    getNGrams.bind(this, 3)();
  }

  render() {
    return (
      <Form>
        <Form.Field>
          <Dropdown
            options={dropdownOptions}
            defaultValue={3}
            onChange={(_, event) => {
              getNGrams.bind(this, event.value)();
            }}
          />
        </Form.Field>
        <Form.Field>
          <Table>
            <Table.Body>
              {this.props.state.data.ngrams.map((words, index) => {
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

export default NGram;
