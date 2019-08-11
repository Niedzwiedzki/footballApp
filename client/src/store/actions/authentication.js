import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const authLoginStart = () => {
    return {
        type: actionTypes.AUTHLOG_START
    }
}

export const authRegisterStart = () => {
    return {
        type: actionTypes.AUTHREG_START
    }
}

export const authLoginSuccess = (loginData) => {
    return {
        type: actionTypes.AUTHLOG_SUCCESS,
        loginData: loginData
    }
}

export const authRegisterSuccess = (loginData) => {
    return {
        type: actionTypes.AUTHREG_SUCCESS,
        loginData: loginData
    }
}

export const authLoginFail = (error) => {
    return {
        type: actionTypes.AUTHLOG_FAIL,
        loginData: error
    }
}

export const authRegisterFail = (error) => {
    return {
        type: actionTypes.AUTHREG_FAIL,
        loginData: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('name');
    localStorage.removeItem('competition')
    localStorage.removeItem('id')
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

export const auth = (email, password, group) => {
    return dispatch => {
        dispatch(authLoginStart());
        const authData = {
            email: email,
            password: password,
        }
        console.log(group)
        
        axios.post('login'+group, authData)
            .then(response => {
                const expirationTime = new Date(new Date().getTime() + expirationDate);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('expirationDate', expirationTime)
                dispatch(authLoginSuccess(response.data.token))
                dispatch(tokenExpired(expirationDate))
            })
            .catch(err => {
                dispatch(authLoginFail(err.response.data));
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
                dispatch(authLoginSuccess(localStorage.getItem('token')))
                dispatch(tokenExpired(expirationDate - new Date()))
            } else {
                dispatch(logout())
            }
            
        }

    }
}

export const wrongPasswords = () => {
    return {
        type: actionTypes.WRONG_PASSWORDS
    }
}

export const register = (name, email, password, group) => {
    return dispatch => {
        dispatch(authRegisterStart());
        const registerData = {
            name: name,
            email: email,
            password: password
        }
        axios.post('register'+group, registerData)
            .then(response => {
                const expirationTime = new Date(new Date().getTime() + expirationDate);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('expirationDate', expirationTime)
                dispatch(authRegisterSuccess(response.data.token));
                dispatch(tokenExpired(expirationDate))
                
            })
            .catch(err => {

                dispatch(authRegisterFail(err.response.data));
            })
    }
}