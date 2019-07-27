import * as actionTypes from './actionTypes';
import axios from 'axios'; // this import isn't sure

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
        axios.get('http://localhost:5000/getGroups',
        {headers: {
            "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkM2MyZmViMjM2NmUwMzE2MDVmZTY4OCIsIm1lbWJlciI6Ikt1YmEiLCJpYXQiOjE1NjQyMjU1MjAsImV4cCI6MTU2NDI2ODcyMH0.jSLV-7R1CE_gWVlU2RbIqkhRVll6a41NqFxaWZ5eMDY",
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