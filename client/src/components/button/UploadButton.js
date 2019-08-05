import React, { Component } from 'react';
import { Button, ButtonProps, Label } from 'semantic-ui-react';
import * as uuid from 'uuid';

class UploadButton extends Component {
  constructor(props) {
    super(props);

    this.id = uuid.v1();
    this.onChangeFile = this.onChangeFile.bind(this);
  };

  render() {
    return (
      <Label as="label" htmlFor="upload" basic>
        <Button
          {...this.props}
          icon="upload"
          label={{ basic: true, content: 'Upload an image or video'}}
          labelPosition="right"
        />
        <input
          hidden
          id="upload"
          multiple
          type="file"
          onChange={e => this.onChangeFile(e) }
        />
      </Label>
    );
  }

  onChangeFile({ target }) {
      const file = target ? target.files[0] : null;
      console.log(file);
      if (this.props.handleFileUpload) {
          this.props.handleFileUpload(file);
      }
  };
}

export default UploadButton;