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
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate')
    return {
        type: actionTypes.LOGOUT
    }
}
const expirationDate = 43200000

export const tokenExpired = (time) => {
    return dispatch => {
        setTimeout(() => { 
            dispatch(logout())
         }, time);
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
                const expirationTime = new Date(new Date().getTime() + expirationDate);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('expirationDate', expirationTime)
                dispatch(authSuccess(response.data.token))
                dispatch(tokenExpired(expirationDate))
            })
            .catch(err => {
                dispatch(authFail(err.response.data));
            })
    }
}

export const loginCheckState = () => {

    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date( localStorage.getItem('expirationDate'));
            if(expirationDate > new Date()) {
                dispatch(authSuccess(localStorage.getItem('token')))
                dispatch(tokenExpired(expirationDate - new Date()))
            } else {
                dispatch(logout())
            }
            
        }

    }
}
