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


export const getGroups = (token) => {
    return dispatch => {
        axios.get('getGroups',
        {headers: {
            "Authorization" : token,
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