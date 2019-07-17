import React from 'react';



const NewMember = (props) => {
  return (
    <li className=""><span>{props.email}</span><span onClick={props.removeMember} className="delete">-</span></li>
  );
};

export default NewMember;