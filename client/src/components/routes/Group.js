import React, { Fragment, useState, useEffect } from 'react';
import Member from '../member/Member';
import SwitchMatches from '../switchMatches/SwitchMatches';
import Finished from '../finished/Finished';
import Scheduled from '../scheduled/Scheduled';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/index';
import { Link } from 'react-router-dom';

const Group = (state) => {
    const [formData, setFormData] = useState({

showFinished: false

      });
    
      let { showFinished } = formData;


      const clickFinished = () => {
        setFormData({ ...formData, showFinished: true});
      }

      const clickScheduled = () => {
        setFormData({ ...formData, showFinished: false});
    }

    const onChange = (matchdata, index, e) => {
        e.preventDefault()
        state.updateBets(matchdata, index, e)
    }
    let displayed =         
        <ul className="list-group matchesToPlay text-primary">
        {
                state.matches.scheduled.map(function(item, index){
                    return <Scheduled 
                    homeTeam={item.homeTeam.name}
                    homeBet={item.bet.homeTeam}
                    awayTeam={item.awayTeam.name}
                    awayBet={item.bet.awayTeam}
                    key={item.id}
                    decreaseHome={(e) => onChange({op: -1, team: 'homeTeam'}, index, e)}
                    increaseHome={(e) => onChange({op: 1, team: 'homeTeam'}, index, e)}
                    decreaseAway={(e) => onChange({op: -1, team: 'awayTeam'}, index, e)}
                    increaseAway={(e) => onChange({op: 1, team: 'awayTeam'}, index, e)}
                    changed = {e => onChange(undefined, index, e)}/>;
                })
        }
        </ul> 
    if (showFinished){
        displayed =         
        <ul className="list-group matchesPlayed">
        {
               state.matches.finished.map(function(item){
                    return <Finished 
                    homeTeam={item.homeTeam.name}
                    homeResult={item.score.fullTime.homeTeam}
                    homeBet={99}
                    awayTeam={item.awayTeam.name}
                    awayResult={item.score.fullTime.awayTeam}
                    awayBet={99}
                    score = {[0,1,3][Math.floor(Math.random()*3)]}
                    key={item.id}/>;
                  })
        }
        </ul>   
    }

    useEffect(() => {
        state.checkGroupSelection()

        }, [])
  return (
    <Fragment>
      <div className="col-sm-6 height-lg">
      <div className="groupName"><Link to='/dashboard'><button type="button" className="btn btn-info"><i className="left"/></button></Link><h3>{localStorage.getItem('name')}</h3></div>
        <ul className="list-group list-group-flush members">
            {
               state.players.map(function(player){
                    return <Member name={player.name} points={1000} key={player._id}/>;
                  })
            }
        </ul>
      </div>
      <div className="col-sm-6">
        <SwitchMatches clickFinished={() => clickFinished()} clickScheduled={() => clickScheduled()} />
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
      updateBets: (matchdata, index, e) => dispatch(actionTypes.updateBets(matchdata, index, e))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Group);
