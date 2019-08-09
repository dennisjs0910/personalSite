import React, { Component } from 'react';
import { Modal, Button } from 'semantic-ui-react';

const DeleteButton = ({ isOwner, handleDelete }) => (
  isOwner && <Button negative content='Delete' onClick={ handleDelete } />
);

const UpdateButton = ({ isOwner, handleUpdateButton }) => (
  isOwner && <Button color='orange' content='Update' onClick={ handleUpdateButton } />
);

const CloseButton = ({ handleClose }) => (
  <Button onClick={() => handleClose(null)} content='Close' />
);

export default class ModalFooter extends Component {
  render() {
    const { blog, handleClose, currentUser, handleDelete, handleUpdateButton } = this.props;
    const isOwner = currentUser && currentUser.id === blog.user_id;

    return (
      <Modal.Actions>
        <DeleteButton
          isOwner={ isOwner }
          handleDelete={ handleDelete }
        />
        <UpdateButton
          isOwner={ isOwner }
          handleUpdateButton={ handleUpdateButton }
        />
        <CloseButton handleClose={ handleClose } />
      </Modal.Actions>
    );
  }
}