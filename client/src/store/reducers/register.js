import * as actionTypes from '../actions/actionTypes';

const initialState = {
    registering: false,
    registered: false,
    message: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.REGISTER_START:
            return {
                ...state,
                registereding: true
            };
        case actionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                registering: false,
                registered: true,
                message: "You have successfully registered"
            };
        case actionTypes.REGISTER_FAIL:
            return {
                ...state,
                registering: false,
                registered: false,
                message: action.registerData
            };
            case actionTypes.WRONG_PASSWORDS:
                return {
                    ...state,
                    registering: false,
                    registered: false,
                    message: "Passwords dont match"
                };
        default:
            return state;
    }
};

export default reducer;