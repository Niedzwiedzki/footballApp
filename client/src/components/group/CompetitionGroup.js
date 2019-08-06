import React from 'react';
import { Link } from 'react-router-dom'



const CompetitionGroup = (props) => {
  let adminClass="memberGroup"
  if(props.status === true) {
    adminClass="adminGroup"
  }
  return (
    <Link to='/group' onClick={props.selectGroup}><div className={adminClass}>{props.name}</div></Link>
  );
};

export default CompetitionGroup;