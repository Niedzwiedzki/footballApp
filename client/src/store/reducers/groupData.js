import * as actionTypes from '../actions/actionTypes';

const initialState = {
    groupId: '',
    competitionId: '',
    players: [],
    matches: {finished: [], scheduled: []},
    name:''
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_GROUP:
            return {
                ...state,
                groupId: action.groupId,
                competitionId: action.competitionId,
                name: action.name
            };
        case actionTypes.GET_PLAYERS:
            return {
                ...state,
                players: action.players
            };
        case actionTypes.SET_MATCHES:
            return {
                ...state,
                matches: action.matches
            };
        default:
            return state;
    }
};


export default reducer;

