import React, { Fragment } from 'react';
import Register from '../auth/Register';
import Joining from '../joining/Joining';
import Login from '../auth/Login';
import Ball from '../staticElements/Ball'


const Invitation = () => {
  return (
    <Fragment>
      <div className="col-sm-6 height-lg">
        <Joining />
        <Login />
        <hr className="space" />
        <Register />
      </div>
      <div className="col-sm-6">
        <Ball />
      </div>
    </Fragment>
  );
};

export default Invitation;