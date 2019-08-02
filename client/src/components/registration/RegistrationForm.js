import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Form, Input, Button } from 'semantic-ui-react'
import { EMAIL, FIRSTNAME, LASTNAME, PASSWORD, CONFIRM_PASSWORD } from './Constants';

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPass: "",
    };
  }

  /**
   * Sets users info to state
   * @param  {Event} e             [Javascript Event Object]
   * @param  {String} options.value [User Input]
   * @param  {String} key           [Type of user input]
   * @return {[type]}               [description]
   */
  handleChange = (e, { value }, key) => {
    if (key === CONFIRM_PASSWORD) this.compareTwoPasswords(value);
    this.setState({
      [key]: value //[key] syntax is "computed keys"
    });
  };

  /**
   * Validity check not required as button will only enable if state info is valid
   * @param  {Event} e [Javascript Event Object]
   */
  handleSubmit = e => {
    e.preventDefault();
    if (!this.compareTwoPasswords(this.state[CONFIRM_PASSWORD])) {
      const { history, registerUser } = this.props;
      const { email, firstName, lastName, password } = this.state;
      registerUser({ email, first_name: firstName, last_name: lastName, password }, history);
    }
  };

  /**
   * Checks validity of email
   * @return {Boolean|| Object} [returns false if valid email otherwise the error message and placement]
   */
  validateEmail = () => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(this.state[EMAIL])) {
      return {
        content: "Please input a valid email address",
        pointing: "above"
      }
    } else {
      return false;
    }
  };

  /**
   * Validates first name
   * @return {Boolean || Object} [return false if first name is not empty string otherwise warning message]
   */
  validateFirstName = () => {
    const { firstName } = this.state;
    if (firstName !== "") return false;
    return {
      content: "Please input your first name",
      pointing: "above"
    }
  };

  /**
   * Validates last name
   * @return {Boolean || Object} [return false if last name is not empty string otherwise warning message]
   */
  validateLastName = () => {
    const { lastName } = this.state;
    if (lastName !== "") return false;
    return {
      content: "Please input your last name",
      pointing: "above"
    }
  };

  /**
   * Validates the two passwords
   * @param  {String} value [this.state[CONFIRM_PASSWORD] state's confirm password]
   * @return {Boolean || Object} [return false if passwords are not matching warning message]
   */
  compareTwoPasswords = (value) => {
    const { password } = this.state;
    if (password === value && value !== "") return false;
    return {
      content: "Passwords must be filled and matching",
      pointing: "above"
    };
  };


  isFormError = (confirmPass) => {
    return !!(
      this.validateEmail() ||
      this.validateFirstName() ||
      this.validateLastName() ||
      this.compareTwoPasswords(confirmPass)
    );
  }

  render() {
    const { confirmPass } = this.state;
    // const isNameError = this.iValidNames(firstName, lastName);
    const isEqualPassword = this.compareTwoPasswords(confirmPass);
    return(
      <Form>
        <Form.Input
          required
          label={"Email"}
          onChange={(e, data) => this.handleChange(e, data, EMAIL)}
          error={ this.validateEmail() }
        />
        <Form.Input
          required
          label={"First Name"}
          onChange={(e, data) => this.handleChange(e, data, FIRSTNAME)}
          error={ this.validateFirstName() }
        />
        <Form.Input
          required
          label={"Last Name"}
          onChange={(e, data) => this.handleChange(e, data, LASTNAME)}
          error={ this.validateLastName() }
        />
        <Form.Input
          required
          label={"Password"}
          onChange={(e, data) => this.handleChange(e, data, PASSWORD)}
          type="password"
          error={ isEqualPassword }
        />
        <Form.Input
          required
          label={"Confirm Password"}
          onChange={(e, data) => this.handleChange(e, data, CONFIRM_PASSWORD)}
          type="password"
          error={ isEqualPassword }
        />
        <Button
          type="submit"
          primary
          onClick={ this.handleSubmit }
          disabled={ this.isFormError(confirmPass) }
        >
          Submit
        </Button>
      </Form>
    );
  }
}

export default withRouter(RegistrationForm);