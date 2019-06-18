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
        <h2>Please provide your information</h2>
        <Form onSubmit={this.handleSubmit} labelAlign='left'>
          <h3 className="input-label required">E-mail</h3>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [{
                type: 'email',
                message: 'The input is not valid E-mail!',
              }, {
                required: true,
                message: 'Please input your E-mail!',
              }],
            })(<Input className="registration-input"/>)}
          </Form.Item>

          <h3 className="input-label required">First Name</h3>
          <Form.Item>
            {getFieldDecorator('first_name', {
              rules: [{ required: true, message: 'Please input your first name!' }],
            })(<Input className="registration-input"/>)}
          </Form.Item>

          <h3 className="input-label required">Last Name</h3>
          <Form.Item>
            {getFieldDecorator('last_name', {
              rules: [{ required: true, message: 'Please input your last name!' }],
            })(<Input className="registration-input"/>)}
          </Form.Item>

          <h3 className="input-label required">Password</h3>
          <Form.Item hasFeedback
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
            })(<Input.Password className="registration-input"/>)}
          </Form.Item>

          <h3 className="input-label required">Confirm Password</h3>
          <Form.Item hasFeedback>
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
            })(<Input.Password className="registration-input"
                  onBlur={this.handleConfirmBlur}
                />)}
          </Form.Item>

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