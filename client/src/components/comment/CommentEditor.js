import React, { Component } from 'react';
import { Comment, Form, Button, List, Input, Popconfirm } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CommentAction } from '../../actions';
import './CommentEditor.css';

const Editor = ({ onChange, onSubmit, value }) => (
  <div>
    <Form.Item>
      <Input.TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

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
    author={ "TODO" }
    content={ item.comment_text }
    datetime={ item.updated_at }
    actions={[
      !!currentUser && (currentUser.id === item.user_id || currentUser.permission === "ADMIN") ?
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
      comments: [],
      value: '',
    };
  }

  componentDidMount() {
    this.props.getComments(this.props.blogId);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createComment({
      comment_text: this.state.value,
      blogPost_id: this.props.blogId,
      parent_id: this.props.parentId,
      user_id: this.props.currentUser.id
    });

    this.setState({ value:'' });
  };

  handleDelete = (e, blogId, id) => {
    e.preventDefault();
    this.props.deleteComment(blogId, id);
  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
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

export default connect(mapStateToProps, mapDispatchToProps)(CommentEditor);