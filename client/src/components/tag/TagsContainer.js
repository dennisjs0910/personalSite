import React, { Component } from 'react';
import TagItem from './TagItem';

const getTagsList = (list, limit) => {
  return !limit ? list : list.slice(0, Math.min(limit, list.length));
}

export default class TagsContainer extends Component {
  render() {
    const { category, limit, size } = this.props;
    const tagsList = getTagsList(category, limit);
    if (!tagsList) return null;

    return tagsList.map((value, idx) => (
      <TagItem key={ idx } value={ value } size={size} />
    ));
  }
}