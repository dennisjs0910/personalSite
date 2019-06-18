import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RegistrationForm from "./RegistrationForm";
import { UserAction } from '../../actions';
import "./registration.css";

import { Layout } from 'antd';
const { Content } = Layout;

class RegistrationContainer extends Component {
  render() {
    const { registerUser } = this.props;
    return (
      <Content className="fullscreen registration-container main-img">
        <RegistrationForm registerUser={registerUser}/>
      </Content>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ registerUser: UserAction.registerUser }, dispatch);
}

export default connect(null, mapDispatchToProps)(RegistrationContainer);