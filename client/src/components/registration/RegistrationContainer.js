import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RegistrationForm from "./RegistrationForm";
import { UserAction } from '../../actions';
import { Message } from 'semantic-ui-react'
import { isEmpty } from 'lodash';

class RegistrationContainer extends Component {
  render() {
    const { registerUser, error } = this.props;
    return (
      <div className="registration-container-body">
        { !isEmpty(error) &&
          <Message
            icon='warning sign'
            warning
            header={ error.field || "Warning" }
            content={ error.message }
          />
        }
        <RegistrationForm registerUser={registerUser}/>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ registerUser: UserAction.registerUser }, dispatch);
};

const mapStateToProps = ({ user }) => {
  const { error } = user;
  return { error };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer);