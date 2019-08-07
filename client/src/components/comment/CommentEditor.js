import React, { Component } from 'react';
import { Button,Form } from 'semantic-ui-react';

export default class CommentEditor extends Component {
  render() {
    const { onChange, onSubmit, value } = this.props;
    return (
      <Form reply>
        <Form.TextArea onChange={ onChange } value={ value }/>
        <p>{`${value.length} / 255`}</p>
        <Button
          primary
          content='Add Reply'
          labelPosition='left'
          icon='edit'
          onClick={ onSubmit }
        />
      </Form>
    );
  };
}