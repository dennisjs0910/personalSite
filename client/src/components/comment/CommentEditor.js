import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Comment, Form, Button, List, Input, Popconfirm } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CommentAction } from '../../actions';
import './CommentEditor.css';

const Editor = ({ onChange, onSubmit, value }) => {
  return (
    <div>
      <Form.Item>
        <Input.TextArea
          className="comment-input"
          rows={4}
          onChange={onChange}
          value={value}
        />
      </Form.Item>
      <h6>{`${value.length} / 255`}</h6>
      <Form.Item>
        <Button htmlType="submit" onClick={onSubmit} type="primary">
          Add Comment
        </Button>
      </Form.Item>
    </div>
  )
};

const CommentList = ({ currentUser, blogId, comments, deleteComment }) => {
  return (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={item => (
      <CustomComment
        item={ item }
        deleteComment={ deleteComment }
        blogId={blogId}
        currentUser={currentUser}
      />
    )}
  />
)};

const CustomComment = ({item, deleteComment, blogId, currentUser}) => (
  <Comment
    key={ item.id }
    author={ item.first_name ? `${item.first_name} ${item.last_name}` : "Unknown" }
    content={ item.comment_text }
    datetime={ item.updated_at }
    actions={[
      !!currentUser && (currentUser.id === item.user_id || currentUser.permission === 'admin') ?
      <Popconfirm
        key={ `popup_${item.id}` }
        title="Are you sure you want to delete this comment?"
        onConfirm={ (e) => deleteComment(e, blogId, item.id) }
        okText="Yes"
        cancelText="No"
      >
        <span className="comment-delete-span">Delete</span>
      </Popconfirm> : null
    ]}
 />
);

class CommentEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  componentDidMount() {
    this.props.getComments(this.props.blogId);
  };

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

  handleDelete = (e, blogId, id) => {
    e.preventDefault();
    this.props.deleteComment(blogId, id);
  };

  handleChange = ({ target }) => {
    const value = target.value.length > 255 ? target.value.substring(0, 255) : target.value;
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    const { comments, blogId, currentUser } = this.props;
    return(
      <div className="comment-container">
        <Comment
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              value={value}
            />
          }
        />
        <div className="comment-list-container">
          {comments.length > 0 && <CommentList
            currentUser={ currentUser }
            blogId={ blogId }
            comments={ comments }
            deleteComment={ this.handleDelete.bind(this) }
          />}
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CommentEditor));