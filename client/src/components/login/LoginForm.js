import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Form, Icon, Input, Button } from 'antd';
import "./login.css";

class LoginFormTemplate extends Component {

  handleSubmit = e => {
    e.preventDefault();
    const { validateFields } = this.props.form;
    const { loginUser, history } = this.props;
    validateFields((err, values) => {
      if (!err) {
        loginUser(values, history);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-form-container">
        <h2 className="login-header">Login</h2>
        <Form onSubmit={this.handleSubmit}>
          <h3 className="input-label required">E-mail</h3>
          <Form.Item className="login-input-container">
            {getFieldDecorator('email', {
              rules: [{
                type: 'email',
                message: 'The input is not valid E-mail!',
              },{
                required: true, message: 'Please input your E-mail!'
              }],
            })(
              <Input
                className="login-input"
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              />,
            )}
          </Form.Item>

          <h3 className="input-label required">Password</h3>
          <Form.Item className="login-input-container password-container">
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                className="login-input"
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const LoginForm = Form.create()(LoginFormTemplate);
export default withRouter(LoginForm);
