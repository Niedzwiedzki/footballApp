import * as actionTypes from '../actions/actionTypes';

const initialState = {
    players: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_PLAYERS:
            return {
                ...state,
                // players: players
            };
        default:
            return state;
    }
};

export default reducer;