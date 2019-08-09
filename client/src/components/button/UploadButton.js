import React, { Component } from 'react';
import { Button, Label } from 'semantic-ui-react';

class UploadButton extends Component {
  /**
   * TODO: support multiple file upload in future
   * When user uploads file, gets the file and sends off to prop function handleFileUpload
   * @param  {DOM Input} options.target [holds current uploaded file]
   */
  onChangeFile({ target }) {
    const file = target ? target.files[0] : null;
    if (this.props.handleFileUpload) {
      this.props.handleFileUpload(file);
    }
  };

  render() {
    return (
      <Label as="label" htmlFor="upload" basic>
        <Button
          icon="upload"
          label={{ basic: true, content: 'Upload an image or video'}}
          labelPosition="right"
        />
        <input
          hidden
          id="upload"
          multiple
          type="file"
          onChange={ this.onChangeFile.bind(this) }
        />
      </Label>
    );
  }
}

export default UploadButton;