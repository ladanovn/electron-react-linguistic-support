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
          console.log(event.target.result);
        };
        reader.readAsText(file);
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
                <Button secondary> Вставить </Button>
              </Grid.Column>
              <Grid.Column>
                <Header icon>
                  <Icon name="file" />С файла
                </Header>
                <Input
                  id="upload_textfile"
                  type="file"
                  encType="multipart/form-data"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Form>
          <Form.Field
            id="source-text"
            control={TextArea}
            label="Исходные данные"
          />
        </Form>
      </section>
    );
  }
}

export default Loader;
