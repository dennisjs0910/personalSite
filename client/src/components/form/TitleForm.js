import React from 'react';
import { Form, Input } from 'semantic-ui-react'

const TitleForm = ({ handleTextInputChange }) => (
  <Form.Field required>
    <label>Blog Title</label>
    <Input onChange={(e, data) => handleTextInputChange(data, "title") } />
  </Form.Field>
);

export default TitleForm;