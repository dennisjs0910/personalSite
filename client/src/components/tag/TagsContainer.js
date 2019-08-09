import React, { Component } from 'react';
import { Label, List, Image } from 'semantic-ui-react'
import TagItem from './TagItem';

export default class TagsContainer extends Component {
  render() {
    const { category, limit } = this.props;
    if (!category) return null;
    if (!limit) return category.map((value, idx) => (<TagItem key={ idx } value={ value } />));

    return category.slice(0, limit).map((value, idx) => (
      <TagItem key={ idx } value={ value } />
    ));
  }
}