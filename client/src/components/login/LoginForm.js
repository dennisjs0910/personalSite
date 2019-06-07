import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Form, Icon, Input, Button } from 'antd';

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
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{
              type: 'email',
              message: 'The input is not valid E-mail!',
            },{
              required: true, message: 'Please input your E-mail!'
            }],
            validateTrigger: "onSubmit",
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const LoginForm = Form.create()(LoginFormTemplate);
export default withRouter(LoginForm);
