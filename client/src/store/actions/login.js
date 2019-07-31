import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const authStart = () => {
    return {
        type: actionTypes.LOGIN_START
    }
}

export const authSuccess = (loginData) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        loginData: loginData
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.LOGIN_FAIL,
        loginData: error
    }
}

export const logout = () => {
    return {
        type: actionTypes.TOKEN_EXPIRES
    }
}
const expirationTime = 43200000

export const tokenExpired = () => {
    return dispatch => {
        setTimeout(() => { 
            dispatch(logout())
         }, expirationTime);
    } 
}

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password
        }
        axios.post('login', authData)
            .then(response => {
                dispatch(authSuccess(response.data.token))
                dispatch(tokenExpired())
            })
            .catch(err => {
                dispatch(authFail(err.response.data));
            })
    }
}
