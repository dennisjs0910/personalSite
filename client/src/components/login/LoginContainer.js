import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginForm from "./LoginForm";
import { AuthAction } from '../../actions';
// import { isEmpty } from 'lodash';
// import "./login.css";

class LoginContainer extends Component {
  // generateErrorDescription = error => {
  //   return `${error.message}`;
  // };

  /**
   * TODO: LOGIN ERR handling
   */
  render() {
    const { loginUser } = this.props;
    return (
      <div className="fullscreen main-img login-container">
        { /**!isEmpty(error) ?
          <Alert
            message="Error"
            description={ this.generateErrorDescription(error) }
            type="error"
            showIcon
          /> : null
        */ }
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