import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import './CreateBlogButton.css'
export default class CreateBlogButton extends Component {
  render() {
    const { currentUser, handleCreateModal } = this.props;
    if (!!!currentUser) return null;
    return(
      <Button primary onClick={ handleCreateModal }>CREATE +</Button>
    );
  }
}