import React from 'react';

const InPlay = (props) => {

  return (
    <li className='list-group-item space inPlay'>
    <div className="spinner-border text-light live"></div>
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

export default InPlay;