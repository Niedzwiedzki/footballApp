import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';

const Landing = () => {
  return (
    <Fragment>
      <div className="col-sm-6 height-lg">
        <Login />
        <hr className="space" />
        <Register />
      </div>
      <div className="col-sm-6">
        <Link
          className="not-active"
          to="https://www.freeiconspng.com/img/25011"
          title="Image from freeiconspng.com"
        >
          <img
            id="ball"
            src="https://www.freeiconspng.com/uploads/football-png-26.png"
            width="350"
            alt="Download And Use Football Png Clipart"
          />
        </Link>
      </div>
    </Fragment>
  );
};

export default Landing;
