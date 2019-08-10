import React from 'react';
import { Form } from 'semantic-ui-react'
import { UploadButton } from '../button';

const UploadMediaForm = ({ handleFileUpload }) => (
  <Form.Field>
    <label>Images and videos</label>
    <UploadButton handleFileUpload={ handleFileUpload }/>
  </Form.Field>
);

export default UploadMediaForm;