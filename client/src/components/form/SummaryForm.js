import React from 'react';
import { Form, TextArea } from 'semantic-ui-react'

const SummaryForm = ({ handleTextInputChange, value }) => (
  <Form.Field required>
    <label>Blog Summary</label>
    <TextArea
      value={ !!value ? value : "" }
      onChange={(e, data) => handleTextInputChange(data, "summary") }
    />
  </Form.Field>
);

export default SummaryForm;