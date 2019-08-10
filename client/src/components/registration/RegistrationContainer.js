import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RegistrationForm from "./RegistrationForm";
import { UserAction } from '../../actions';
import { Message } from 'semantic-ui-react'
import { isEmpty } from 'lodash';

class RegistrationContainer extends Component {
  /**
   * When user clicks on close message it dispatches action to redux
   */
  handleMessageDismiss = () => {
    this.props.clearError();
  };

  render() {
    const { registerUser, error } = this.props;
    return (
      <div className="registration-container-body">
        { !isEmpty(error) &&
          <Message
            onDismiss={ this.handleMessageDismiss }
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
  return bindActionCreators({
    registerUser: UserAction.registerUser,
    clearError: UserAction.clearError,
  }, dispatch);
};

const mapStateToProps = ({ user }) => {
  const { error } = user;
  return { error };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer);