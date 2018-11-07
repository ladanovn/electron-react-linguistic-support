import React, { Component } from "react";
import { Form, TextArea, Input } from "semantic-ui-react";

class Cleaner extends Component {
  componentWillMount() {
    const newState = JSON.parse(JSON.stringify(this.props.state));
    newState.data.clearedText = newState.data.fullText;
    let newClearedText = [...newState.data.clearedText].map(symbol => {
      if (newState.data.stopSymbols.includes(symbol)) return " ";
      else return symbol;
    });
    newState.data.clearedText = newClearedText
      .join("")
      .replace(/\s+/g, " ")
      .toLowerCase();
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
            const stopSymbols = [...event.value];
            const newState = JSON.parse(JSON.stringify(this.props.state));
            newState.data.stopSymbols = event.value;
            newState.data.clearedText = newState.data.fullText;
            let newClearedText = [...newState.data.clearedText].map(symbol => {
              if (stopSymbols.includes(symbol)) return " ";
              else return symbol;
            });
            newState.data.clearedText = newClearedText
              .join("")
              .replace(/\s+/g, " ")
              .toLowerCase();
            this.props.changeState(newState);
          }}
        />
        <Form.Field
          control={TextArea}
          label="Очищенный текст"
          value={
            this.props.state.data.clearedText || this.props.state.data.fullText
          }
          autoHeight
        />
      </Form>
    );
  }
}

export default Cleaner;
