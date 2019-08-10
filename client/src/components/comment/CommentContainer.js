import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { CommentAction } from '../../actions';
import CommentList from './CommentList';
import CommentEditor from './CommentEditor';

import { Comment, Header } from 'semantic-ui-react';
import './Comment.css';

class CommentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  componentDidMount() {
    this.props.getComments(this.props.blogId);
  };

  /**
   * If user is not logged in force them to login page
   * otherwise call createComment call back fn with comment data and reset state's value
   * @param  {Event} e
   */
  handleSubmit = (e) => {
    e.preventDefault();
    const { currentUser, parentId, blogId, history } = this.props;
    if (!currentUser) {
      history.push("/login");
      return;
    }

    this.props.createComment({
      comment_text: this.state.value,
      blogPost_id: blogId,
      parent_id: parentId,
      user_id: currentUser.id
    });
    this.setState({ value:'' });
  };

  /**
   * Update string value of comment and limit text length to max 255 char
   * @param  {[String]} options.value  [user input]
   */
  handleChange = (e, { value }) => {
    const input = value.length > 255 ? value.substring(0, 255) : value;
    this.setState({ value : input });
  };

  /**
   * Sends a request to backend api with blog's id and comment's id
   * @param  {Integer} blogId [blog's id]
   * @param  {Integer} commentId     [comment's id]
   */
  handleDelete = (blogId, commentId) => {
    this.props.deleteComment(blogId, commentId);
  };

  render() {
    const { comments, currentUser } = this.props;
    const { value } = this.state;
    return (
      <Comment.Group className="comment-container">
        <Header as='h3' dividing>
          Comments
        </Header>
        <CommentList comments={ comments } currentUser={ currentUser } handleDelete={ this.handleDelete.bind(this) }/>
        <CommentEditor
          onChange={ this.handleChange }
          onSubmit={ this.handleSubmit }
          value={ value }
        />
      </Comment.Group>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getComments: CommentAction.getComments,
      createComment: CommentAction.createComment,
      updateComment: CommentAction.updateComment,
      deleteComment: CommentAction.deleteComment,
    },
    dispatch
  );
}

const mapStateToProps = ({ comment }) => {
  return { comments: comment.items || [] };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CommentContainer));