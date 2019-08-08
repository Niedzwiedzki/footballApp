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
                console.log(response.data)
                dispatch(yourGroups(response.data))
            })
            .catch (error => {
                dispatch(fetchGroupsFailed());
            })
    }
}

export const groupFound = (groupToJoin) => {
    return {
        type: actionTypes.GROUP_FOUND,
        groupToJoin: groupToJoin
    };
} 

export const lookForGroup = (group) => {
    return dispatch => {
        const groupData = {
            group: group
        }
        axios.get('lookForGroup', {
            params: groupData
          })
            .then(response => {
                dispatch(groupFound(response.data))
            })
            .catch (error => {
                console.log(error.response)
            })
    }
}