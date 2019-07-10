import React from 'react';



const Member = (props) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">{props.name}
        <span className="badge badge-primary badge-pill">{props.points}</span>
    </li>
  );
};

export default Member;