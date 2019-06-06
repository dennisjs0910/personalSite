import React, { Component } from "react";
import { Menu, Icon, Affix } from 'antd';
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AuthAction } from '../../actions';
import { ReactComponent as Logo } from "../../assets/logo.svg";

const LOGOUT = "logout";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'home',
      top: 0
    }
    this.renderAuthMenuItem = this.renderAuthMenuItem.bind(this);
  }

  handleClick = e => {
    const { logoutUser, history } = this.props;
    if (e.key === LOGOUT) {
      logoutUser(history);
      this.setState({ current: 'login'});
      return;
    }
    this.setState({ current: e.key });
  }

  renderAuthMenuItem () {
    const { current_user, hasLoggedIn } = this.props;
    if (!!!current_user && !hasLoggedIn) {
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

  render() {
    return (
      <Affix offsetTop={this.state.top}>
        <Menu //theme="dark"
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
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
          { /**
             * Commenting out for now.
             *
              <Menu.Item key="about-me">
                <Icon type="smile" />
                About me
              </Menu.Item>
             */ }
          { this.renderAuthMenuItem() }
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
