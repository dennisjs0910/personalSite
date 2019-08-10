import React, { Component } from "react";
import { Dropdown, Menu, Icon } from 'semantic-ui-react';

const LinkedinDropdownItem = () => (
  <Dropdown.Item
    href="https://www.linkedin.com/in/joonsuk-dennis-yi/"
    target='_blank'
  >
    <Icon name="linkedin"/>LinkedIn
  </Dropdown.Item>
);

const GithubDropdownItem = () => (
  <Dropdown.Item
    href="https://github.com/dennisjs0910"
    target='_blank'
  >
    <Icon name="github"/>Github
  </Dropdown.Item>
);

export default class SocialMediaDropdown extends Component {
  render() {
    return(
      <Menu.Item>
        <Icon name="address card"/>Social
        <Dropdown>
          <Dropdown.Menu>
            <LinkedinDropdownItem />
            <GithubDropdownItem />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    );
  }
};