import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const setGroup = (id, competition, name) => {
    localStorage.setItem('id', id);
    localStorage.setItem('competition', competition);
    localStorage.setItem('name', name);
} 



export const groupPlayers = (players) => {
    return {
        type: actionTypes.GET_PLAYERS,
        players: players
    };
} 


export const setMatches = (matches) => {
    return {
        type: actionTypes.SET_MATCHES,
        matches: matches
    };
} 


export const getMatchesAndPlayers = (token, competition, id) => {
    return dispatch => {
        const data = {
            competitionId: competition,
            id: id
        }
        axios.get('getMatchesAndPlayers',
        { params: data, headers: {
            "Authorization" : token,
            "Content-Type" : "application/json"
          }
        }
        )
            .then(response => {
                dispatch(setMatches(response.data.matchesToSend))
                dispatch(groupPlayers(response.data.groupMembers))
            })
            .catch (error => {
                console.log(error.response)
            })
    }
}


export const groupCheckState = () => {
    return dispatch => {
        const id = localStorage.getItem('id');
        const competition = localStorage.getItem('competition');
        const name = localStorage.getItem('name');
        const token = localStorage.getItem('token')
            const expirationDate = new Date( localStorage.getItem('expirationDate'));
            if(expirationDate > new Date() && id && competition && name) {
                dispatch(getMatchesAndPlayers(token, competition, id))
            }
    }
}


export const updateBets = (matchdata, index, value) => {
    if(matchdata && !value.score){
        return {
            type: actionTypes.INCREASE_OR_DECREASE,
            team: matchdata.team,
            op: matchdata.op,
            index: index
        };
    }  else {
        return {
            type: actionTypes.UPDATE_BETS,
            value: value,
            index: index
        };

    }

} 








