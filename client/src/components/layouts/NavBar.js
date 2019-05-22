import React, { Component } from "react";
import { Menu, Icon, Affix } from 'antd';
import { ReactComponent as Logo } from "assets/logo.svg";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

// import { connect } from "react-redux";
// import { Link, withRouter } from "react-router-dom";
// import { Menu, Dropdown, Icon } from "semantic-ui-react";
// import { ReactComponent as Logo } from "assets/logo.svg";
// import { AuthAction, UserAction } from "actions";
// import { UserType, MenuTitle } from "enums";
// import '../../css/navBar.css';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'mail',
      top: 0
    }
  }

  // static getDerivedStateFromProps(props, state) {
  //   const activeItem = menuItems.find(item => item.path === props.location.pathname);
  //   return {
  //     activeItem: (activeItem && activeItem.name) || MenuTitle.APPOINTMENTS
  //   };
  // }

  // _handleItemClick(e, { name }) {
  //   this.setState({ activeItem: name });
  // }

  // _createNavButton({ path, name, position }) {
  //   const { activeItem } = this.state;
  //   return (
  //     <Menu.Item
  //       position={position}
  //       className={`navbar-${position}-item`}
  //       as={Link}
  //       to={path}
  //       key={name}
  //       name={name}
  //       active={activeItem === name}
  //       onClick={this._handleItemClick.bind(this)} />
  //   );
  // }

  // _renderNavButtons() {
  //   let type = this.props.auth.current_user.type;
  //   let displayItems = [];

  //   // TODO: Unnecessary, but UserType.valueOf(type) returns entire object.
  //   // This code will likely get refactored anyway when permissions come into play.
  //   switch (type) {
  //     case UserType.PATIENT:
  //       displayItems = menuItems.slice(0, 0);
  //       break;
  //     case UserType.STAFF:
  //       displayItems = menuItems.slice(0, 2);
  //       break;
  //     case UserType.ADMIN:
  //       displayItems = menuItems.slice(0, 3);
  //       break;
  //     default:
  //       break;
  //   }

  //   return displayItems.map(this._createNavButton.bind(this));
  // }

  // _renderUserDropDown() {
  //   const dropDownTriggerIcon = (
  //     <Icon
  //       className="menuUserIcon"
  //       name="user circle outline"
  //       size="big" />
  //   );

  //   return (
  //     <Dropdown
  //       item
  //       icon={null}
  //       trigger={dropDownTriggerIcon}
  //       pointing>
  //       <Dropdown.Menu>
  //         <Dropdown.Item
  //           key="profile"
  //           icon="setting"
  //           text="My Profile"
  //           onClick={this.props.dispatch.bind(this, UserAction.openUserPopup(this.props.auth.current_user))} />
  //         <Dropdown.Item
  //           key="logout"
  //           icon="log out"
  //           text="Logout"
  //           onClick={this.props.dispatch.bind(this, AuthAction.logoutUser(this.props.history))} />
  //       </Dropdown.Menu>
  //     </Dropdown>
  //   )
  // }

  // _renderEmptyNavBar() {
  //   return ('');
  // }

  // _renderCustomNavBar() {
  //   return (
  //     <Menu
  //       className="navbar non-printable"
  //       borderless>
  //       <Menu.Menu
  //         position="left"
  //         className="navbar-left-group">
  //         <Menu.Item
  //           className="navbar-logo-item"
  //           position="left"
  //           as={Link}
  //           to="/"
  //           name={MenuTitle.APPOINTMENTS}
  //           onClick={this._handleItemClick.bind(this)}>
  //           <Logo className="mainLogo" />
  //         </Menu.Item>
  //         {this._renderNavButtons()}
  //       </Menu.Menu>
  //       <Menu.Menu
  //         position="right"
  //         className="navbar-right-group"
  //         children={this._renderUserDropDown()} />
  //     </Menu>
  //   );
  // }
  handleClick = e => {
    console.log("click click");
    this.setState({ current: e.key });
  }

  render() {
    return (
      <Affix offsetTop={this.state.top}>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
          // theme="dark"
        >
          <Menu.Item key="home">
            <Icon component={Logo} />
          </Menu.Item>
          <Menu.Item key="blog">
            <Icon type="layout" />
            Blog
          </Menu.Item>
          <Menu.Item key="about-me">
            <Icon type="smile" />
            About me
          </Menu.Item>
          <Menu.Item key="login">
            <Icon type="login"/>
            Login
          </Menu.Item>
        </Menu>
      </Affix>
    );
  }
}

// const mapStateToProps = state => state;
export default NavBar;
// export default connect(mapStateToProps)(withRouter(NavBar));
