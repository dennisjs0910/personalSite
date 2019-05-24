import React, { Component } from 'react';
import { Layout, Row, Col, Form, Input, Button, Tag, Icon } from 'antd';

const { Content } = Layout;

class BpForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      inputVisible: false,
      inputValue: '',
    };

    this.renderTagForm = this.renderTagForm.bind(this);
  }

  // Copied Code, revise later if needed
  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  saveInputRef = input => (this.input = input);

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }

    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  };

  handleSubmit = e => {
    const { tags } = this.state;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        console.log('Received tags: ', tags);
      } else {
        console.log(err);
      }
    });
  };

  // TODO: logic refactor
  renderTagForm() {
    const { tags, inputVisible, inputValue } = this.state;
    return(
      <Form.Item label="Tags">
        {
          inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />)
        }
        {
          !inputVisible && (
          <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
            <Icon type="plus" /> New Tag
          </Tag>)
        }
        <div>
          {
            tags.map(tag => <Tag key={tag}>{tag}</Tag>)
          }
        </div>
      </Form.Item>
    );
  }
  // Copied Code, ends here

  render() {
    const { getFieldDecorator } = this.props.form;
    const { tags, inputVisible, inputValue } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} className="bp-form-container">
        <Form.Item label="Blog Title">
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Please input the title for this blog', }],
          })(<Input />)}
        </Form.Item>
        { this.renderTagForm() }

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Post Blog Content
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const BlogForm = Form.create()(BpForm)
export default BlogForm;