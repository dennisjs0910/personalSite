import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginForm from "./LoginForm";
import { AuthAction } from '../../actions';
import { Layout } from 'antd';
import "./login.css";

const { Content } = Layout;

class LoginContainer extends Component {

  render() {
    const { loginUser } = this.props;
    return (
      <Content className="fullscreen">
        <div className="login-container">
          <LoginForm loginUser={loginUser}/>
        </div>
      </Content>
    );
  }
}

const mapStateToProps = state => state.auth;
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ loginUser: AuthAction.loginUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);