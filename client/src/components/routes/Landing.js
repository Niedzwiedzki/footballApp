import React, { Fragment } from 'react';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Ball from '../staticElements/Ball'


const Landing = () => {
  return (
    <Fragment>
      <div className="col-sm-6 height-lg">
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

export default Landing;
