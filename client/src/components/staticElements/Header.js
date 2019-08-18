import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import turnOff from '../../images/turnOff.svg';
import Settings from '../../images/settings.svg';
import { Link } from 'react-router-dom';
import * as actionTypes from '../../store/actions/index';
import { Redirect } from 'react-router-dom';


const Header = (state) => {


  const [menu, setMenu] = useState({
    menuState: "open"
  });
  const { menuState } = menu; 
  
  // const menuClick = () => {
  //   if(menuState == "open"){
  //   setMenu({menuState: "close"})
  // } else {
  //   setMenu({menuState: "open"})
  // }
  // }
//  let hamburgerClass
//  let menuList
  // if(menuState == "open"){
  //   hamburgerClass = "hamburger open"
  //   menuList = "menu hidden"
  // } else if(menuState == "close"){
  //   hamburgerClass = "hamburger close"
  //   menuList = "menu"
  // }

state.checkAuthState()
let image = null;
let redirect = null;

// let settings = <div className="settingsButton">
// <img src={Settings} alt="Settings"/>
// </div>

if(state.loggedIn === true) {
  image = 
      <Link className="logoutButton" to="/logout">Log out
      {/* <img src={turnOff} alt="Logout"/> */}
      </Link>
   }

   useEffect(() => {
    if(state.loggedIn === false) {
      redirect = <Redirect to="/"/>
  }
}, [])


  return (
    <div className="col-sm-12 height-sm header">
      {redirect}
      <h1 className="text-center">footballApp</h1>
      {/* <div onClick={menuClick} className={hamburgerClass}><div></div></div> */}
      {image}
      {/* <div className={menuList}>
        <ul>
          <li>
            <div class="menuItem">
              {image} <p>Logout</p>
            </div>
          </li>
          <li>
          <div class="menuItem">
              {settings} <p>Settings</p>
            </div>
          </li>
        </ul>
      </div> */}
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
