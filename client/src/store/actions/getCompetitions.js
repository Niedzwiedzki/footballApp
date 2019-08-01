import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const availableCompetitions = (competitions) => {
    return {
        type: actionTypes.AVAILABLE_COMPETITIONS,
        competitions: competitions
    };
} 



export const getCompetitions = (token) => {
    return dispatch => {
        axios.get('availablecompetitions',
        {headers: {
            "Authorization" : token,
            "Content-Type" : "application/json"
          }
        }
        )
            .then(response => {
                dispatch(availableCompetitions(response.data))
            })
            .catch (error => {
                console.log(error)
            })
    }
}