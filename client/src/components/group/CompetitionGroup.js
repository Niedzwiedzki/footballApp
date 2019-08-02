import React from 'react';



const CompetitionGroup = (props) => {
  let adminClass="memberGroup"
  if(props.status === true) {
    adminClass="adminGroup"
  }
  return (
    <div className={adminClass}>{props.name}</div>
  );
};

export default CompetitionGroup;