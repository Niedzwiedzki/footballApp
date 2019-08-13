import React from 'react';


const Scheduled = (props) => {
  let predictionStatus = 'list-group-item space'
  if(props.status === "full"){
    predictionStatus = "list-group-item space completed"
  }
  return (
    <li className={predictionStatus}>
      <div className="column-layout">
        <div className="width-fl">
          <span>{props.homeTeam}</span>
          <span>{props.awayTeam}</span>
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