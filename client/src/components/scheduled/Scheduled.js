import React from 'react';

const Scheduled = (props) => {

  return (
    <li className="list-group-item space">
      <div className="column-layout">
        <div className="width-fl">
          <span>{props.homeTeam}</span>
          <span>{props.awayTeam}</span>
        </div>
        <form>
          <div className="width-mdplus">
            <button type="button" className="btn btn-danger width-sm">-</button>
            <button type="button" className="btn btn-success width-sm">+</button>
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
            <button type="button" className="btn btn-success width-sm">+</button>
            <button type="button" className="btn btn-danger width-sm">-</button>
            <button type="submit" className="btn btn-primary width-sm">></button>
          </div>
        </form>
      </div>
    </li>
  );
};

export default Scheduled;