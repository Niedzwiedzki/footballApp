import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const registerStart = () => {
    return {
        type: actionTypes.REGISTER_START
    }
}

export const registerSuccess = () => {
    return {
        type: actionTypes.REGISTER_SUCCESS
    }
}

export const registerFail = (error) => {
    return {
        type: actionTypes.REGISTER_FAIL,
        registerData: error
    }
}

export const wrongPasswords = () => {
    return {
        type: actionTypes.WRONG_PASSWORDS
    }
}

export const register = (name, email, password) => {
    return dispatch => {
        dispatch(registerStart());
        const registerData = {
            name: name,
            email: email,
            password: password
        }

        axios.post('register', registerData)
            .then(response => {
                dispatch(registerSuccess());
            })
            .catch(err => {

                dispatch(registerFail(err.response.data));
            })
    }
}