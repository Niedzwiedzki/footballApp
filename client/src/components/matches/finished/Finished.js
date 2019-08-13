import React from 'react';

const Finished = (props) => {
  let classResult;
  if(props.score === 3) {
    classResult = "list-group-item list-group-item-success space";
  } else if (props.score === 1) {
    classResult = "list-group-item list-group-item-warning space";
  } else if (props.score === 0) {
    classResult = "list-group-item list-group-item-danger space";
  }
  return (
    <li className={classResult}>
    <div className="column-layout">
      <div className="width-lg">{props.homeTeam}</div>
        <div className="width-sm">
            <span className="badge badge-secondary">{props.homeResult}</span>
            <span className="badge badge-secondary">{props.awayResult}</span>
        </div>
      <div className="width-lg">{props.awayTeam}</div>
      <div className="width-fl">
          <span className="badge badge-primary">{props.homeBet}</span>
          <span className="badge badge-primary">{props.awayBet}</span>
      </div>
    </div>
  </li>
  );
};

export default Finished;