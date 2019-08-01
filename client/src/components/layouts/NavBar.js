import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AuthAction } from '../../actions';
import { ReactComponent as Logo } from "../../assets/logo.svg";

import { Menu, Image, Icon } from 'semantic-ui-react';

const LOGOUT = "logout";

const menuItems = {
  "/login"  : "login",
  "/logout" : LOGOUT,
  "/"       : "blogs",
  "/signup" : "signup",
  "/resume" : "resume"
};

const AuthMenuItem = ({ currentUser, hasLoggedIn, handleClick, activeMenu }) => {
  if (!!!currentUser && !hasLoggedIn) {
    return(
      <Menu.Item name="login" onClick={ handleClick } active={activeMenu === 'login'}>
        <Icon name="sign-in"/>
        Login
      </Menu.Item>
    )
  } else {
    return(
      <Menu.Item name="logout" onClick={ handleClick } active={activeMenu === 'logout'}>
        <Icon name="sign-out"/>
        Logout
      </Menu.Item>
    )
  }
};


const SignUpGreetingMenuItem = ({ currentUser, hasLoggedIn }) => {
  if (!!!currentUser && !hasLoggedIn) {
    return(
      <Menu.Item name="signup">
        <Link to="/signup">
          <Icon name="user plus"/>
          Sign Up
        </Link>
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
  }

  // static getDerivedStateFromProps(props, state) {
  //   const { pathname } = props.location;
  //   return { activeMenu: menuItems[pathname] || 'home' };
  // }

  handleClick = (e, { name }) => {
    this.setState({ activeMenu: name });
    // const { logoutUser, history } = this.props;
    // if (e.key === LOGOUT) {
    //   logoutUser(history);
    //   this.setState({ activeMenu: 'login'});
    //   return;
    // }
    // this.setState({ activeMenu: e.key });
  }

  render() {
    const { activeMenu } = this.state;

    return(
      <Menu stackable>
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
