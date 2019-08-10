import React, { Component } from 'react';
import CommentItem from './CommentItem';

export default class CommentList extends Component {
  render() {
    const { comments, currentUser, handleDelete } = this.props;
    return comments.map(comment => (
      <CommentItem
        key={ comment.id }
        comment={ comment }
        currentUser={ currentUser }
        handleDelete={ handleDelete }
      />
    ));
  }
}