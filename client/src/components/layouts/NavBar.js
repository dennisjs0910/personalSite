import React, { Component } from "react";
import { Menu, Icon, Affix } from 'antd';
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AuthAction } from '../../actions';
import { ReactComponent as Logo } from "../../assets/logo.svg";

const LOGOUT = "logout";
const menuItems = {
  "/login"  : "login",
  "/logout" : "logout",
  "/"       : "home",
  "/blogs"  : "blogs",
  "/signup" : "signup"
};

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenu: 'home',
      top: 0
    }

    this.renderAuthMenuItem = this.renderAuthMenuItem.bind(this);
    this.renderSignUpGreetingMenutItem = this.renderSignUpGreetingMenutItem.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const { pathname } = props.location;
    return { activeMenu: menuItems[pathname] || 'home' };
  }

  handleClick = e => {
    const { logoutUser, history } = this.props;
    if (e.key === LOGOUT) {
      logoutUser(history);
      this.setState({ activeMenu: 'login'});
      return;
    }
    this.setState({ activeMenu: e.key });
  }

  renderAuthMenuItem() {
    const { currentUser, hasLoggedIn } = this.props;
    if (!!!currentUser && !hasLoggedIn) {
      return(
        <Menu.Item key="login">
          <Link to="/login">
            <Icon type="login"/>
            Login
          </Link>
        </Menu.Item>
      )
    } else {
      return(
        <Menu.Item key="logout">
          <Icon type="logout"/>
          Logout
        </Menu.Item>
      )
    }
  }

  renderSignUpGreetingMenutItem() {
    const { currentUser, hasLoggedIn } = this.props;
    if (!!!currentUser && !hasLoggedIn) {
      return(
        <Menu.Item key="signup">
          <Link to="/signup">
            <Icon type="user-add"/>
            Sign Up
          </Link>
        </Menu.Item>
      )
    } else {
      return(
        <Menu.Item key="greeting">
          <Icon type="user"/>
          {`${currentUser.first_name} ${currentUser.last_name}`}
        </Menu.Item>
      )
    }
  }

  render() {
    return (
      <Affix offsetTop={this.state.top}>
        <Menu //theme="dark"
          onClick={this.handleClick}
          selectedKeys={[this.state.activeMenu]}
          mode="horizontal"
        >
          <Menu.Item key="home">
            <Link to="/">
              <Icon component={Logo} />
            </Link>
          </Menu.Item>

          <Menu.Item key="blogs">
            <Link to="/blogs">
              <Icon type="layout" />
              Blog
            </Link>
          </Menu.Item>
          { this.renderAuthMenuItem() }
          { this.renderSignUpGreetingMenutItem() }
        </Menu>
      </Affix>
    );
  }
}

const mapStateToProps = state => state.auth;
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ logoutUser: AuthAction.logoutUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));
