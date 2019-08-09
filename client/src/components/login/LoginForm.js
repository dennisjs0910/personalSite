/* eslint-disable */
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Form, Button } from 'semantic-ui-react'

class LoginFormTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  };

  handleSubmit = e => {
    const {email, password} = this.state;
    this.props.loginUser(email, password, this.props.history);
  };

  handleChange = (e, { value }, key) => {
    this.setState({ [key] : value });
  };

  /**
   * Checks validity of email
   * @return {Boolean|| Object} [returns false if valid email otherwise the error message and placement]
   */
  validateEmail = () => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(this.state.email)) {
      return {
        content: "Please input a valid email address",
        pointing: "above"
      }
    } else {
      return false;
    }
  }

  render() {
    return(
      <Form onSubmit={ this.handleSubmit } >
        <Form.Input
          error={ this.validateEmail() }
          label='Email'
          onChange={(e, data) => this.handleChange(e, data, "email") }
        />
        <Form.Input
          label='Password'
          type='password'
          onChange={(e, data) => this.handleChange(e, data, "password") }
        />
        <Button primary type='submit'>Submit</Button>
      </Form>
    );
  }
}

export default withRouter(LoginFormTemplate);
