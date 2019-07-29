import * as actionTypes from '../actions/actionTypes';

const initialState = {
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
                loggedIn: true,
                logging: false,
                message: "You have successfully loggedIn"
            };
        default:
            return state;
    }
};

export default reducer;