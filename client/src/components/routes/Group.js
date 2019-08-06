import React, { Fragment, useState, useEffect } from 'react';
import Member from '../member/Member';
import SwitchMatches from '../switchMatches/SwitchMatches';
import Finished from '../finished/Finished';
import Scheduled from '../scheduled/Scheduled';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/index';
import { Redirect } from 'react-router-dom';

const Group = (state) => {
    const [formData, setFormData] = useState({
        name: "Mistrzostwa u Janka",
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
    
    
      let { name, finished, scheduled, showFinished } = formData;


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
                scheduled.map(function(item, index){
                    return <Scheduled 
                    homeTeam={item.homeTeam.name}
                    homeBet={item.homeTeam.bet}
                    awayTeam={item.awayTeam.name}
                    awayBet={item.awayTeam.bet}
                    key={item.id}
                    changed = {e => onChange(e, index)}/>;
                })
        }
        </ul> 
    if (showFinished){
        displayed =         
        <ul className="list-group matchesPlayed">
        {
               finished.map(function(item){
                    return <Finished 
                    homeTeam={item.homeTeam.name}
                    homeResult={item.homeTeam.score}
                    homeBet={item.homeTeam.bet}
                    awayTeam={item.awayTeam.name}
                    awayResult={item.awayTeam.score}
                    awayBet={item.awayTeam.bet}
                    score = {item.score}
                    key={item.id}/>;
                  })
        }
        </ul>   
    }

    useEffect(() => {
        state.getPlayers(state.token, state.selectedGroup)
        }, [])
    console.log(state.players)
  return (
    <Fragment>
      <div className="col-sm-6 height-lg">
        <h3>{name}</h3>
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
    token: state.authentication.token,
    players: state.groupData.players
    }
  }
  
  
  const mapDispatchToProps = dispatch => {
    return {
      getPlayers: (token, id) => dispatch(actionTypes.getPlayers(token, id))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Group);
