import React from 'react';
import { connect } from 'react-redux';
import turnOff from '../../images/turnOff.svg';
import { Link } from 'react-router-dom';

const Header = (state) => {
  
let image = null

const logout = () => {
  state.logout();
}


if(state.loggedIn == true) {
  image = 
      <Link className="menuButton" to="/logout">
      <img src={turnOff} alt="Logout"/>
      </Link>
   }

  return (
    <div className="col-sm-12 height-sm header">
      <h1 className="text-center">footballApp</h1>
      {image}
      <hr className="space" />
    </div>
  );

};

const mapStateToProps = state => {
  return {
    loggedIn: state.login.loggedIn
  }
}


// const mapDispatchToProps = dispatch => {
//   return {
//     logout: () => dispatch(actionTypes.logout())
//   }
// }



export default connect(mapStateToProps)(Header);
