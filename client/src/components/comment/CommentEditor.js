import React, { Component } from 'react';
import { Button,Form } from 'semantic-ui-react';
import { isEmpty } from 'lodash';

export default class CommentEditor extends Component {
  render() {
    const { onChange, onSubmit, value, currentUser } = this.props;
    return ( !isEmpty(currentUser) &&
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