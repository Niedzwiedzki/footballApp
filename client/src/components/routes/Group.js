import React, { Fragment, useState, useEffect } from 'react';
import Member from '../member/Member';
import SwitchMatches from '../switchMatches/SwitchMatches';
import Finished from '../matches/finished/Finished';
import Scheduled from '../matches/scheduled/Scheduled';
import InPlay from '../matches/inPlay/InPlay';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/index';
import { Link } from 'react-router-dom';
import axios from '../../axios';

const Group = (state) => {

    const [formData, setFormData] = useState({

showScheduled: true,
showFinished: false,
showInPlay: false

      });
    
      let {showScheduled, showFinished, showInPlay} = formData;


      const clickFinished = () => {
        setFormData({ ...formData, showFinished: true, showScheduled: false, showInPlay: false});
      }

      const clickScheduled = () => {
        setFormData({ ...formData, showFinished: false, showScheduled: true, showInPlay: false});
    }

      const clickInPlay = () => {
        setFormData({ ...formData, showFinished: false, showScheduled: false, showInPlay: true});
    }



    const onChange = (matchdata, index, e) => {
        e.preventDefault()
        const value = {score: e.target.value, team: e.target.dataset.team}
        state.updateBets(matchdata, index, value)
    }

    const predictResult = (e, predictData, index) => {
      e.preventDefault();
      state.sendBet(predictData, index)
  }
  let displayed
  if(showScheduled) {
      displayed =         
        <ul className="list-group matchesToPlay text-primary">
        {
                state.matches.scheduled.map(function(item, index){
          
                    return <Scheduled 
                    homeTeam={item.homeTeam.name}
                    homeBet={item.bet.homeTeam}
                    awayTeam={item.awayTeam.name}
                    awayBet={item.bet.awayTeam}
                    key={item.id}
                    status={item.betStatus}
                    decreaseHome={(e) => onChange({op: -1, team: 'homeTeam'}, index, e)}
                    increaseHome={(e) => onChange({op: 1, team: 'homeTeam'}, index, e)}
                    decreaseAway={(e) => onChange({op: -1, team: 'awayTeam'}, index, e)}
                    increaseAway={(e) => onChange({op: 1, team: 'awayTeam'}, index, e)}
                    send={(e) => predictResult(e, {id: item.id, homeBet: item.bet.homeTeam,awayBet: item.bet.awayTeam}, index)}
                    changed = {e => onChange(undefined, index, e)}/>;
                })
        }
        </ul> 
  } else if (showFinished){
    displayed =         
    <ul className="list-group matchesPlayed">
    {
            state.matches.finished.map(function(item){
                return <Finished 
                homeTeam={item.homeTeam.name}
                homeResult={item.score.fullTime.homeTeam}
                homeBet={item.bet.homeTeam}
                awayTeam={item.awayTeam.name}
                awayResult={item.score.fullTime.awayTeam}
                awayBet={item.bet.awayTeam}
                score = {item.betScore}
                key={item.id}/>;
              })
    }
    </ul>   
} else if (showInPlay){
  displayed =         
  <ul className="list-group text-primary">
  {
          state.matches.inPlay.map(function(item){
              return <InPlay
              homeTeam={item.homeTeam.name}
              homeResult={item.score.fullTime.homeTeam}
              homeBet={item.bet.homeTeam}
              awayTeam={item.awayTeam.name}
              awayResult={item.score.fullTime.awayTeam}
              awayBet={item.bet.awayTeam}
              key={item.id}/>;
            })
  }
  </ul> 
}

    useEffect(() => {
      state.checkGroupSelection()
      setInterval(()=>{state.checkGroupSelection()}, 60000)
        }, [])
  return (
    <Fragment>
      <div className="col-sm-6 height-lg">
      <div className="groupName"><Link to='/dashboard'><button type="button" className="btn btn-info"><i className="left"/></button></Link><h3>{localStorage.getItem('name')}</h3></div>
        <ul className="list-group list-group-flush members">
            {
               state.players.map(function(player){
                    return <Member name={player.name} points={player.totalPoints} key={player._id}/>;
                  })
            }
        </ul>
      </div>
      <div className="col-sm-6">
        <SwitchMatches clickFinished={() => clickFinished()} clickScheduled={() => clickScheduled()} clickInPlay={() => clickInPlay()}/>
        {displayed}
      </div>
    </Fragment>
  );
};


const mapStateToProps = state => {
    return {
    selectedGroup: state.groupData.groupId,
    competitionId: state.groupData.competitionId,
    token: state.authentication.token,
    players: state.groupData.players,
    name: state.groupData.name,
    matches: state.groupData.matches
    }
  }

  
  const mapDispatchToProps = dispatch => {
    return {
      checkGroupSelection: () => dispatch(actionTypes.groupCheckState()),
      updateBets: (matchdata, index, e) => dispatch(actionTypes.updateBets(matchdata, index, e)),
      sendBet: (predictData, index) => dispatch(actionTypes.sendBet(predictData, index))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Group);
