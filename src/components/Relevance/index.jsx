import React, { Component } from "react";
import { Porter } from "../../libs/porter";
import { Table, Form, Input } from "semantic-ui-react";

function calcRelevance(_, e) {
  const porter = new Porter();
  const newState = JSON.parse(JSON.stringify(this.props.state));
  const text = e.value
    .replace(/[^A-ZА-Я]/gi, " ")
    .replace(/\s+/g, " ")
    .toLowerCase();

  const words = text.split(" ").filter(word => word !== "");
  const stemmedWords = porter
    .stemAll(words)
    .filter(word => word !== "" && word.length >= 3);

  const matchingWords = [];
  let R = 0;
  let maxR = 0;

  stemmedWords.forEach(word => {
    let k = 0;
    this.props.state.data.weightCoef.forEach(coefGroup => {
      coefGroup.words.forEach(el => {
        if (el.value === word) {
          k = coefGroup.width;
        }
      });
    });

    if (k !== 0) {
      const groupedWord = this.props.state.data.groupedWords.find(gWord => {
        return gWord.value === word;
      });

      matchingWords.push(groupedWord.value);
      R += (1 / k) * groupedWord.count;
      maxR += groupedWord.count;
    }
  });

  newState.data.relevance = {
    text,
    stemmedWords,
    relevance: R / maxR,
    matchingWords
  };

  this.props.changeState(newState);
}

class Relevance extends Component {
  render() {
    return (
      <Form>
        <Form.Field>
          <Input
            icon={{ name: "search", circular: true, link: true }}
            placeholder="Search ..."
            onChange={calcRelevance.bind(this)}
          />
        </Form.Field>
        <Form.Field>
          <b>
            Коэффициент релевантности:{" "}
            {this.props.state.data.relevance.relevance}
          </b>
        </Form.Field>
        <Form.Field>
          <Table>
            <Table.Body>
              {this.props.state.data.relevance.matchingWords.map(
                (word, index) => {
                  return (
                    <Table.Row key={index}>
                      <Table.Cell>{word}</Table.Cell>
                    </Table.Row>
                  );
                }
              )}
            </Table.Body>
          </Table>
        </Form.Field>
      </Form>
    );
  }
}

export default Relevance;
