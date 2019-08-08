import React, { Component } from 'react';
import { Modal, Button, Confirm } from 'semantic-ui-react';

const DeleteButton = ({ isOwner, handleConfirmVisibility }) => (
  isOwner && <Button onClick={ handleConfirmVisibility } negative content='Delete' />
);

const UpdateButton = ({ isOwner }) => (
  isOwner && <Button color='orange' content='Update' />
);

const CloseButton = ({ handleClose }) => (
  <Button onClick={() => handleClose(null)} content='Close' />
);

export default class ModalFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen : false,
    }
  };

  /**
   * Open or closes Confirm element
   */
  handleConfirmVisibility = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  /**
   * When user confirms delete blog, it calls props.handleDelete as well as close confirm
   */
  handleDeleteConfirm = () => {
    this.props.handleDelete();
    this.setState({ isOpen: false });
  };

  render() {
    const { blog, handleClose, currentUser } = this.props;
    const { isOpen } = this.state;
    const isOwner = currentUser && currentUser.id === blog.user_id;
    return (
      <Modal.Actions>
        <DeleteButton
          isOwner={ isOwner }
          handleConfirmVisibility={ this.handleConfirmVisibility.bind(this) }
        />
        <UpdateButton
          isOwner={ isOwner }
        />
        <CloseButton handleClose={ handleClose } />
        <Confirm
          open={ isOpen }
          confirmButton={<Button negative content="Delete"/>}
          onCancel={ this.handleConfirmVisibility }
          onConfirm={ this.handleDeleteConfirm.bind(this) }
        />
      </Modal.Actions>
    );
  }
}