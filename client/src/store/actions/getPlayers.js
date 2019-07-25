import * as actionTypes from './actionTypes';
import axios from 'axios'; // this import isn't sure

export const groupPlayers = (players) => {
    return {
        type: actionTypes.GET_PLAYERS,
        players: players
    };
} 

export const fetchPlayersFailed = () => {
    return {
        type: actionTypes.FETCH_PLAYERS_FAILED
    };
} 

export const getPlayers = () => {
    return dispatch => {
        axios.get('urltest')
            .then(response => {
                dispatch(groupPlayers(response.data))
            })
            .catch (error => {
                dispatch(fetchPlayersFailed());
            })
    }
}