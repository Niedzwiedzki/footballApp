import React from 'react';
import { Link } from 'react-router-dom';

const Ball = () => {
  return (
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
  );
};

export default Ball;