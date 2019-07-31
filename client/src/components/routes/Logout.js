import { Redirect } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/index';


const Logout = (state) => {
    state.logout();
  return (
    <Redirect to="/"/>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actionTypes.logout())
  }
}

export default connect(null, mapDispatchToProps)(Logout);