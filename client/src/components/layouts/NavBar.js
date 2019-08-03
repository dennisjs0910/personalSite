import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AuthAction } from '../../actions';
import { ReactComponent as Logo } from "../../assets/logo.svg";

import { Menu, Image, Icon } from 'semantic-ui-react';
import { LOGOUT, LOGIN, HOME, SIGNUP, RESUME, URI_ITEM_MAP } from "./Constants.js"

const AuthMenuItem = ({ currentUser, hasLoggedIn, handleClick, activeMenu }) => {
  if (!!!currentUser && !hasLoggedIn) {
    return(
      <Menu.Item name="login" onClick={ handleClick } active={activeMenu === LOGIN}>
        <Icon name="sign-in"/>
        Login
      </Menu.Item>
    )
  } else {
    return(
      <Menu.Item name="logout" onClick={ handleClick } active={activeMenu === LOGOUT}>
        <Icon name="sign-out"/>
        Logout
      </Menu.Item>
    )
  }
};


const SignUpGreetingMenuItem = ({ currentUser, hasLoggedIn, handleClick, activeMenu }) => {
  if (!!!currentUser && !hasLoggedIn) {
    return(
      <Menu.Item name="signup" onClick={ handleClick } active={activeMenu === SIGNUP}>
        <Icon name="user plus"/>
        Sign Up
      </Menu.Item>
    )
  } else {
    return(
      <Menu.Item name="greeting">
        <Icon name="user"/>
        {`${currentUser.first_name} ${currentUser.last_name}`}
      </Menu.Item>
    )
  }
};

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenu: 'home',
      top: 0
    }
  };

  static getDerivedStateFromProps(props, state) {
    const { pathname } = props.location;
    return { activeMenu: URI_ITEM_MAP[new String(pathname)] || 'home' };
  };

  handleClick = (e, { name }) => {
    const { logoutUser, history } = this.props;
    this.handlePageSwitch(name, history);
    if (name === LOGOUT) {
      logoutUser(history);
      this.setState({ activeMenu: 'login'});
      return;
    }
    this.setState({ activeMenu: name });
  };

  handlePageSwitch = (name, history) => {
    switch (name) {
      case LOGIN:
        history.push("/login");
        return;
      case HOME:
        history.push("/");
        return;
      case RESUME:
        history.push("/resume");
        return;
      case SIGNUP:
        history.push("/signup");
        return;
      default:
        history.push("/login");
        return;
    }
  };

  render() {
    const { activeMenu } = this.state;

    return(
      <Menu>
        <Menu.Item
          name="home"
          onClick={ this.handleClick }
          active={ activeMenu === 'home' }
        >
          <Icon name="home"/>
          Home
        </Menu.Item>

        <AuthMenuItem
          currentUser={ this.props.currentUser }
          hasLoggedIn={ this.props.hasLoggedIn }
          handleClick={ this.handleClick.bind(this) }
          activeMenu={ activeMenu }
        />
        <SignUpGreetingMenuItem
          currentUser={ this.props.currentUser }
          hasLoggedIn={ this.props.hasLoggedIn }
          handleClick={ this.handleClick.bind(this) }
          activeMenu={ activeMenu }
        />
      </Menu>
    );
  }
}

const mapStateToProps = state => state.auth;
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ logoutUser: AuthAction.logoutUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));
