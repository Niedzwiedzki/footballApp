import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    logging: false,
    registering: false,
    authStatus: false,
    logMessage: null,
    regMessage: null
}
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTHLOG_START:
            return {
                ...state,
                logging: true
            };
        case actionTypes.AUTHREG_START:
            return {
                ...state,
                registering: true
            };
        case actionTypes.AUTHLOG_FAIL:
            return {
                ...state,
                authStatus: false,
                logging: false,
                logMessage: action.loginData
            };
        case actionTypes.AUTHREG_FAIL:
            return {
                ...state,
                authStatus: false,
                registering: false,
                regMessage: action.loginData
            };
        case actionTypes.AUTHLOG_SUCCESS:
            return {
                ...state,
                token: action.loginData,
                authStatus: true,
                logging: false,
                logMessage: "You have successfully loggedIn"
            };
        case actionTypes.AUTHREG_SUCCESS:
            return {
                ...state,
                token: action.loginData,
                authStatus: true,
                registering: false,
                regMessage: "You have successfully loggedIn"
            };
        case actionTypes.LOGOUT:
            return {
                ...state,
                token: null,
                authStatus: false,
                logMessage: null
            };
        default:
            return state;
    }
};

export default reducer;