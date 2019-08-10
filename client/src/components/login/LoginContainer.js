import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginForm from "./LoginForm";
import { AuthAction } from '../../actions';
import { Message } from 'semantic-ui-react'
import { isEmpty } from 'lodash';

class LoginContainer extends Component {
  /**
   * When user clicks on close message it dispatches action to redux
   */
  handleMessageDismiss = () => {
    this.props.clearError();
  };

  render() {
    const { loginUser, error } = this.props;
    return (
      <div className="fullscreen main-img login-container">
        { !isEmpty(error) && !!error.field &&
          <Message
            onDismiss={ this.handleMessageDismiss }
            icon='warning sign'
            warning
            header={ error.field }
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
  return bindActionCreators({
    loginUser: AuthAction.loginUser,
    clearError: AuthAction.clearError,
   }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);