import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const yourGroups = (groups) => {
    return {
        type: actionTypes.GET_GROUPS,
        groups: groups
    };
} 

export const fetchGroupsFailed = () => {
    return {
        type: actionTypes.FETCH_GROUPS_FAILED
    };
} 


export const getGroups = () => {
    return dispatch => {
        axios.get('getGroups',
        {headers: {
            "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkM2MyZmViMjM2NmUwMzE2MDVmZTY4OCIsIm1lbWJlciI6Ikt1YmEiLCJpYXQiOjE1NjQzMzQ4MDYsImV4cCI6MTU2NDM3ODAwNn0.Njm6VLauVnC9H8k6lEFzNB33XbXNNJC2ZAk0Vj8gqGg",
            "Content-Type" : "application/json"
          }
        }
        )
            .then(response => {
                dispatch(yourGroups(response.data))
            })
            .catch (error => {
                dispatch(fetchGroupsFailed());
            })
    }
}