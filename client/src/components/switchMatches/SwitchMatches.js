import React from 'react';

const SwitchMatches = (props) => {
  return (
    <ul className="nav nav-tabs" role="tablist">
        <li className="nav-item">
            <a className="nav-link active" data-toggle="tab" href="#home" onClick={props.clickScheduled}>Scheduled</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#menu1" onClick={props.clickFinished}>Finished</a>
        </li>
    </ul>
  );
};

export default SwitchMatches;