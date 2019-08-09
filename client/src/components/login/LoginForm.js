/* eslint-disable */
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Form, Button } from 'semantic-ui-react'
const EMAIL = "email";
const PASSWORD = "password";

class LoginFormTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  };
  /**
   * Calls callback props.loginUser to validate and login user
   * @param  {Event} e
   */
  handleSubmit = e => {
    const {email, password} = this.state;
    this.props.loginUser(email, password, this.props.history);
  };

  /**
   * Set state[key] = value if key is one of enum values
   * @param  {Event} e
   * @param  {String} options.value [User Input]
   * @param  {String Enum} key      ["email", "password"]
   */
  handleChange = (e, { value }, key) => {
    if (key !== EMAIL && key !== PASSWORD) return;
    this.setState({ [key] : value });
  };

  /**
   * If email is valid return false else return SUIR dependent object
   * @return {Boolean|| Object}
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
  };

  /**
   * If password is empty string or email is not valid return true (button is disabled) else false
   * @return {Boolean}
   */
  isSubmitDisabled = () => {
    return this.state.password === "" || !!this.validateEmail();
  };

  render() {
    return(
      <Form onSubmit={ this.handleSubmit } >
        <Form.Input
          required
          error={ this.validateEmail() }
          label='Email'
          onChange={(e, data) => this.handleChange(e, data, "email") }
        />
        <Form.Input
          required
          label='Password'
          type='password'
          onChange={(e, data) => this.handleChange(e, data, "password") }
        />
        <Button
          primary
          type='submit'
          disabled={ this.isSubmitDisabled() }
          content="Login"
        />
      </Form>
    );
  }
}

export default withRouter(LoginFormTemplate);
