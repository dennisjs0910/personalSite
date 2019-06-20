import React, { Component } from 'react';
import { Comment, Form, Button, List, Input } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CommentAction } from '../../actions';

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

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
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

  //TODO:
  componentDidMount() {
    this.props.getComments(this.props.blogId);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('this.props.currentUser', this.props.currentUser);
    const data = {
      comment_text: this.state.value,
      blogPost_id: this.props.blogId,
      parent_id: this.props.parentId,
      user_id: this.props.currentUser.id
    };

    this.props.createComment(data);
    // this.setState({
    //   value: ''
    // });
  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { comments, value } = this.state;
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
        {comments.length > 0 && <CommentList comments={comments} />}
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

export default connect(null, mapDispatchToProps)(CommentEditor);