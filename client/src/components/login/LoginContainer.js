import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginForm from "./LoginForm";
import { AuthAction } from '../../actions';

class LoginContainer extends Component {

  render() {
    const { loginUser } = this.props;
    return (
      <LoginForm loginUser={loginUser}/>
    );
  }
}

const mapStateToProps = state => state.auth;
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ loginUser: AuthAction.loginUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);