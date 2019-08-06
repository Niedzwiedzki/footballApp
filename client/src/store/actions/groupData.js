import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const setGroup = (id) => {
    return {
        type: actionTypes.SET_GROUP,
        groupId: id
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