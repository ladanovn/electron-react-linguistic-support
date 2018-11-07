import React, { Component } from "react";
import {
  Form,
  TextArea,
  Button,
  Segment,
  Grid,
  Icon,
  Header,
  Divider,
  Input
} from "semantic-ui-react";

class Loader extends Component {
  componentDidMount() {
    document.getElementById("upload_textfile").addEventListener(
      "change",
      event => {
        const files = event.target.files;
        const file = files[0];
        const reader = new FileReader();
        reader.onload = function(event) {
          const newState = JSON.parse(JSON.stringify(this.props.state));
          newState.data.fullText = event.target.result;
          this.props.changeState(newState);
        }.bind(this);
        reader.readAsText(file);
      },
      false
    );

    document.getElementById("upload_clipboard").addEventListener(
      "click",
      () => {
        navigator.clipboard
          .readText()
          .then(text => {
            const newState = JSON.parse(JSON.stringify(this.props.state));
            newState.data.fullText = text;
            this.props.changeState(newState);
          })
          .catch(err => {
            const newState = JSON.parse(JSON.stringify(this.props.state));
            newState.data.fullText = "";
            this.props.changeState(newState);
          });
      },
      false
    );
  }

  render() {
    return (
      <section>
        <Segment placeholder>
          <Grid columns={2} stackable textAlign="center">
            <Divider vertical>Or</Divider>
            <Grid.Row verticalAlign="middle">
              <Grid.Column>
                <Header icon>
                  <Icon name="paste" />С буфера обмена
                </Header>
                <Button id="upload_clipboard" secondary>
                  {" "}
                  Вставить{" "}
                </Button>
              </Grid.Column>
              <Grid.Column>
                <Header icon>
                  <Icon name="file" />С файла
                </Header>
                <div>
                  <Input
                    id="upload_textfile"
                    type="file"
                    encType="multipart/form-data"
                  />
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Form>
          <Form.Field
            id="source-text"
            control={TextArea}
            label="Исходные данные"
            value={this.props.state.data.fullText}
          />
        </Form>
      </section>
    );
  }
}

export default Loader;
