import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginForm from "./LoginForm";
import { AuthAction } from '../../actions';
import { Message } from 'semantic-ui-react'
import { isEmpty } from 'lodash';

class LoginContainer extends Component {
  render() {
    const { loginUser, error } = this.props;
    return (
      <div className="fullscreen main-img login-container">
        { !isEmpty(error) && !!error.field &&
          <Message
            icon='warning sign'
            warning
            header={ error.field.toUpperCase() }
            content={ error.message }
          />
        }
        <div className="login-container">
          <LoginForm loginUser={loginUser}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state.auth;
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ loginUser: AuthAction.loginUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);