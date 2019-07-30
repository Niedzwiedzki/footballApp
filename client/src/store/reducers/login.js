import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    logging: false,
    loggedIn: false,
    message: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.LOGIN_START:
            return {
                ...state,
                logging: true
            };
        case actionTypes.LOGIN_FAIL:
            console.log(action)
            return {
                ...state,
                loggedIn: false,
                logging: false,
                message: action.loginData
            };
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                token: action.loginData,
                loggedIn: true,
                logging: false,
                message: "You have successfully loggedIn"
            };
        case actionTypes.TOKEN_EXPIRES:
            return {
                ...state,
                token: null,
                loggedIn: false,
                message: "Please login again"
            };
        default:
            return state;
    }
};

export default reducer;