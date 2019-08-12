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

export const getPlayers = (token, id) => {
    return dispatch => {
        const groupId = {
            id: id
        }
        axios.get('getPlayers',
        { params: groupId, headers: {
            "Authorization" : token,
            "Content-Type" : "application/json"
          }
        }
        )
            .then(response => {
                
                dispatch(groupPlayers(response.data))
            })
            .catch (error => {
                console.log(error.response)
            })
    }
}


export const setMatches = (matches) => {
    return {
        type: actionTypes.SET_MATCHES,
        matches: matches
    };
} 


export const getMatches = (token, competitionId) => {
    return dispatch => {
        const data = {
            competitionId: competitionId
        }
        axios.get('getMatches',
        { params: data, headers: {
            "Authorization" : token,
            "Content-Type" : "application/json"
          }
        }
        )
            .then(response => {
                console.log(response.data)
                dispatch(setMatches(response.data))
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
                dispatch(getPlayers(token, id));
                dispatch(getMatches(token, competition))
            }
    }
}


export const updateBets = (matchdata, index, e) => {
    if(matchdata && !e.target.value){
        return {
            type: actionTypes.INCREASE_OR_DECREASE,
            team: matchdata.team,
            op: matchdata.op,
            index: index
        };
    }  else {
        return {
            type: actionTypes.UPDATE_BETS,
            e: e,
            index: index
        };

    }

} 








