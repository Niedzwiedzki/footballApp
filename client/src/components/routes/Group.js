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
        // name: "Mistrzostwa u Janka",
    finished: [
        {
            id: "12345",
            homeTeam: {
                name: "Brazil",
                score: 3,
                bet: 3
            },
            awayTeam: {
                name: "France",
                score: 2,
                bet: 2
            },
            score: 3
        },
        {
            id: "123456",
            homeTeam: {
                name: "Germany",
                score: 0,
                bet: 1
            },
            awayTeam: {
                name: "Spain",
                score: 0,
                bet: 1
            },
            score: 1
        },
        {
            id: "1234567",
            homeTeam: {
                name: "Poland",
                score: 1,
                bet: 0
            },
            awayTeam: {
                name: "Italy",
                score: 0,
                bet: 2
            },
            score: 0
        }
    ],
    scheduled: [        
        {
        id: "123458",
        homeTeam: {
            name: "England",
            bet: 3
        },
        awayTeam: {
            name: "Ukraine",
            bet: 1
        }
     },
     {
        id: "123459",
        homeTeam: {
            name: "Ireland",
            bet: null
        },
        awayTeam: {
            name: "Sweden",
            bet: null
        }
     },
     {
        id: "123450",
        homeTeam: {
            name: "Greece",
            bet: null
        },
        awayTeam: {
            name: "Portugal",
            bet: null
        }
     }
],
showFinished: false

      });
    
    console.log(state.matches.scheduled)
      let { finished, scheduled, showFinished } = formData;


      const clickFinished = () => {
        setFormData({ ...formData, showFinished: true});
      }

      const clickScheduled = () => {
        setFormData({ ...formData, showFinished: false});
    }

    const onChange = (e, index) => {
        scheduled[index][e.target.dataset.team].bet = e.target.value
        setFormData({ ...formData});
    }
    let displayed =         
        <ul className="list-group matchesToPlay text-primary">
        {
                state.matches.scheduled.map(function(item, index){
                    return <Scheduled 
                    homeTeam={item.homeTeam.name}
                    homeBet={1}
                    awayTeam={item.awayTeam.name}
                    awayBet={1}
                    key={item.id}
                    changed = {e => onChange(e, index)}/>;
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
        state.getPlayers(state.token, state.selectedGroup)
        state.getMatches(state.token, state.competitionId)
        }, [])
  return (
    <Fragment>
      <div className="col-sm-6 height-lg">
      <div className="groupName"><Link to='/dashboard'><button type="button" className="btn btn-info"><i className="left"/></button></Link><h3>{state.name}</h3></div>
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
      getPlayers: (token, id) => dispatch(actionTypes.getPlayers(token, id)),
      getMatches: (token, competitionId) => dispatch(actionTypes.getMatches(token, competitionId))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Group);
