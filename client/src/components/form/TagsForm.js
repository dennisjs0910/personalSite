import React from 'react';
import { Form, Dropdown } from 'semantic-ui-react'

const TagsForm = ({ options, tags, handleTagAddition, handleTagChange }) => (
  <Form.Field>
    <label>Tags</label>
    <Dropdown
      options={ options }
      placeholder="Add Tags"
      search
      selection
      fluid
      multiple
      allowAdditions
      value={ tags }
      onAddItem={ handleTagAddition }
      onChange={ handleTagChange }
    />
  </Form.Field>
);

export default TagsForm;