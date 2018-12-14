import React, { Component } from "react";
import { Form, TextArea } from "semantic-ui-react";

function clearText(text) {
  return text
    .replace(/[^A-ZА-Я]/gi, " ")
    .replace(/\s+/g, " ")
    .toLowerCase();
}

class Cleaner extends Component {
  componentWillMount() {
    const newState = JSON.parse(JSON.stringify(this.props.state));
    newState.data.clearedText = clearText(newState.data.fullText);
    this.props.changeState(newState);
  }
  render() {
    return (
      <Form>
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
