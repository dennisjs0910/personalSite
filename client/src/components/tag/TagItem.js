import React, { Component } from 'react';
import { Label } from 'semantic-ui-react'
import './TagItem.css';

const COLOR_ENUMS = ["yellow", "olive", "green", "teal", "violet", "purple", "pink"];
const getRandomInt = () => {
  return Math.floor(Math.random() * Math.floor(COLOR_ENUMS.length));
};

const TagItem = ({ value, size }) => (
  <Label
    className="tag-label"
    color={ COLOR_ENUMS[ getRandomInt() ] }
    content={ value }
    size={ size }
  />
);
export default TagItem;