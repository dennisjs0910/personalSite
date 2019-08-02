import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RegistrationForm from "./RegistrationForm";
import { UserAction } from '../../actions';

class RegistrationContainer extends Component {
  render() {
    const { registerUser } = this.props;
    return (
      <div className="registration-container-body">
        <RegistrationForm registerUser={registerUser}/>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ registerUser: UserAction.registerUser }, dispatch);
}

export default connect(null, mapDispatchToProps)(RegistrationContainer);