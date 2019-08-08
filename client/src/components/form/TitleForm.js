import React from 'react';
import { Form, Input } from 'semantic-ui-react'

const TitleForm = ({ handleTextInputChange, value }) => (
  <Form.Field required>
    <label>Blog Title</label>
    <Input
      value={ value ? value : "" }
      onChange={(e, data) => handleTextInputChange(data, "title") }
    />
  </Form.Field>
);

export default TitleForm;