import React from 'react';


const Scheduled = (props) => {
  let predictionStatus = 'list-group-item space'
  let sendingStatus;
  if(props.status === "full" || props.status === "sending"){
    predictionStatus = "list-group-item space completed"
  }

  if(props.status === 'full'){
    sendingStatus = <div className="matchItemStatus">&#10003;</div>
  } else if (props.status === 'sending') {
    sendingStatus = <div className="spinner-border text-light matchItemStatus"></div>
  }
  return (
    <li className={predictionStatus}>
      {sendingStatus}
      <div className="column-layout">
        <div className="width-fl team-container">
          <h5>{props.homeTeam}</h5>
          <h5>{props.awayTeam}</h5>
        </div>
        <form>
          <div className="width-mdplus">
            <button type="button" className="btn btn-danger width-sm" onClick={props.decreaseHome}>-</button>
            <button type="button" className="btn btn-success width-sm" onClick={props.increaseHome}>+</button>
          </div>
          <div className="width-md">
            <input type="number"
            data-team="homeTeam"
            placeholder={props.homeBet}
            value={props.homeBet}
            onChange={props.changed}
            />
            <input type="number"
            data-team="awayTeam"
            placeholder={props.awayBet}
            value={props.awayBet}
            onChange={props.changed}
            />
          </div>
          <div className="width-mdplus">
            <button type="button" className="btn btn-success width-sm" onClick={props.increaseAway}>+</button>
            <button type="button" className="btn btn-danger width-sm" onClick={props.decreaseAway}>-</button>
            <button type="submit" className="btn btn-primary width-sm" onClick={props.send}>></button>
          </div>
        </form>
      </div>
    </li>
  );
};

export default Scheduled;