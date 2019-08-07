import React, { Component } from 'react';
import { Button, Comment, Confirm } from 'semantic-ui-react'

const CommentDelete = ({ currentUser, comment, handleConfirmVisibility }) => (
  !!currentUser && currentUser.id === comment.user_id &&
  <Comment.Action onClick={ handleConfirmVisibility }>
    Delete
  </Comment.Action>
);


const CommentTime = ({ date }) => (
  <div>
    {`[${date.getFullYear()}-${date.getMonth()}-${date.getDay()}] ${date.getHours()}:${date.getMinutes()}`}
  </div>
);

export default class CommentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  };

  /**
   * Calls handleDelete prop function with blog's id and comment's id
   * @param  {Event} e
   * @param  {Integer} blogId    [blog's id]
   * @param  {Integer} commentId [comment's id]
   */
  handleDeleteConfirm = (e, blogId, commentId) => {
    e.preventDefault();
    const { handleDelete } = this.props;
    handleDelete(blogId, commentId);
    this.setState({ isOpen: false });
  };

  /**
   * Opens and closes delete confirm popup
   */
  handleConfirmVisibility = () => {
    this.setState({ isOpen : !this.state.isOpen });
  };

  /** TODO:
   * implement <Comment.Action>Reply</Comment.Action>
   */
  render() {
    const { isOpen } = this.state;
    const { comment, currentUser } = this.props;
    return (
      <Comment>
        <Comment.Content>
          <Comment.Author as='a'>
            { `${comment.first_name} ${comment.last_name}` }
          </Comment.Author>
          <Comment.Metadata>
            <CommentTime date={ new Date(comment.updated_at) }/>
          </Comment.Metadata>
          <Comment.Text>{ comment.comment_text }</Comment.Text>
          <Comment.Actions>
            <CommentDelete
              currentUser={ currentUser }
              comment={ comment }
              handleConfirmVisibility={ this.handleConfirmVisibility.bind(this) }
            />
          </Comment.Actions>
        </Comment.Content>
        <Confirm
          open={ isOpen }
          confirmButton={<Button negative content="Delete"/>}
          onCancel={ this.handleConfirmVisibility }
          onConfirm={(e) => this.handleDeleteConfirm(e, comment.blogPost_id, comment.id) }
        />
      </Comment>
    );
  };
}