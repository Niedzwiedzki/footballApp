import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const setGroup = (id, competition, name) => {
    return {
        type: actionTypes.SET_GROUP,
        groupId: id,
        competitionId: competition,
        name: name
    };
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

