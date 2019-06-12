import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { withRouter } from "react-router-dom";

class RegistrationFormTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { validateFieldsAndScroll } = this.props.form;
    const { history, registerUser } = this.props;

    validateFieldsAndScroll((err, values) => {
      if (!err) {
        registerUser(values, history);
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="signup-form-container">
        <Form onSubmit={this.handleSubmit} labelAlign='left'>
          <Form.Item label="E-mail"
            labelCol={{span: 5}}
            wrapperCol={{span: 19}}
          >
            {getFieldDecorator('email', {
              rules: [{
                type: 'email',
                message: 'The input is not valid E-mail!',
              }, {
                required: true,
                message: 'Please input your E-mail!',
              }],
              validateTrigger: "onSubmit",
            })(<Input />)}
          </Form.Item>

          <Form.Item label="First Name"
            labelCol={{span: 5}}
            wrapperCol={{span: 19}}
          >
            {getFieldDecorator('first_name', {
              rules: [{ required: true, message: 'Please input your first name!' }],
            })(<Input />)}
          </Form.Item>

          <Form.Item label="Last Name"
            labelCol={{span: 5}}
            wrapperCol={{span: 19}}
          >
            {getFieldDecorator('last_name', {
              rules: [{ required: true, message: 'Please input your last name!' }],
            })(<Input />)}
          </Form.Item>

          <Form.Item label="Password" hasFeedback
            labelCol={{span: 5}}
            wrapperCol={{span: 19}}
          >
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="Confirm Password" hasFeedback
            labelCol={{span: 5}}
            wrapperCol={{span: 19}}
          >
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
          {/**<Form.Item label="Phone Number">
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: 'Please input your phone number!' }],
              })(<Input addonBefore={prefixSelector} />)}
            </Form.Item>*/}

          <Form.Item className="signup-submit-button">
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const RegistrationForm = Form.create()(RegistrationFormTemplate);
export default withRouter(RegistrationForm);