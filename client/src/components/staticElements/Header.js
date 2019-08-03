import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import turnOff from '../../images/turnOff.svg';
import { Link } from 'react-router-dom';
import * as actionTypes from '../../store/actions/index';


const Header = (state) => {

state.checkAuthState()
let image = null

if(state.loggedIn === true) {
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
    loggedIn: state.authentication.authStatus
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuthState: () => dispatch(actionTypes.loginCheckState())
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(Header);
