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
    renderItem={item => (
      <Comment
        author={"dennis yi"}
        content={item.comment_text}
        datetime={item.updated_at}
     />)
    }
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
    const { value } = this.state;
    const { comments } = this.props;
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

const mapStateToProps = ({ comment }) => {
  return { comments: comment.items || [] };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentEditor);