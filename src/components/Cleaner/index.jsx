import React, { Component } from "react";
import { Form, TextArea, Input } from "semantic-ui-react";

function clearText(text, stopSymbols) {
  return text
    .split("")
    .map(symbol => {
      if (stopSymbols.includes(symbol)) return " ";
      else return symbol;
    })
    .join("")
    .replace(/\s+/g, " ")
    .toLowerCase();
}

class Cleaner extends Component {
  componentWillMount() {
    const newState = JSON.parse(JSON.stringify(this.props.state));
    newState.data.clearedText = clearText(
      newState.data.fullText,
      newState.data.stopSymbols
    );
    this.props.changeState(newState);
  }
  render() {
    return (
      <Form>
        <Form.Field
          control={Input}
          label="Стоп символы"
          value={this.props.state.data.stopSymbols}
          onChange={(_, event) => {
            const newState = JSON.parse(JSON.stringify(this.props.state));
            newState.data.stopSymbols = event.value;
            newState.data.clearedText = clearText(newState.data.fullText, [
              ...event.value
            ]);
            this.props.changeState(newState);
          }}
        />
        <Form.Field
          control={TextArea}
          label="Очищенный текст"
          value={this.props.state.data.clearedText}
          autoHeight
        />
      </Form>
    );
  }
}

export default Cleaner;
