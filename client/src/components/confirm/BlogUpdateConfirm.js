import React, { Component } from 'react';
import { Button, Confirm } from 'semantic-ui-react'

const CLOSE = "close";
const SUBMIT = "submit";
const REMOVE_MEDIA = "removeMedia";
const CONFIRM_MESSAGE = {
  close: "Are you sure you want to close? Blog will not be saved.",
  submit: "Are you sure you want to update your blog?",
  removeMedia: "Are you sure you want to remove this media item? Image / Video and summary will not be saved."
};

const ConfirmPrimaryButton = ({ confirmType, ...rest }) => {
  if (confirmType === SUBMIT) {
    return (<Button {...rest} positive icon='checkmark' labelPosition='right'content="Submit"/>);
  } else if (confirmType === CLOSE) {
    return (<Button {...rest} negative content="Yes"/>);
  }
  return null;
}

class BlogUpdateConfirm extends Component {
  render() {
    const { isConfirmOpen, confirmType, handleCancel, handleConfirm } = this.props;
    return (
      <Confirm
        content={ CONFIRM_MESSAGE[confirmType] }
        open={ isConfirmOpen }
        confirmButton={<ConfirmPrimaryButton confirmType={ confirmType } />}
        cancelButton={<Button content="No" />}
        onCancel={ handleCancel(null) }
        onConfirm={ handleConfirm(confirmType) }
      />
    );
  }
}

export default BlogUpdateConfirm;