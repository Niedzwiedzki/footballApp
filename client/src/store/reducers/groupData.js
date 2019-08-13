import * as actionTypes from '../actions/actionTypes';

const initialState = {
    players: [],
    matches: {finished: [], scheduled: [], inPlay:[]}
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
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
        case actionTypes.UPDATE_BETS:
            console.log(action.value)
            const updatedMatches = state.matches.scheduled.slice()
            updatedMatches[action.index].bet = {
                ...updatedMatches[action.index].bet,
                [action.value.team]: Number(action.value.score)
            }
            return {
                ...state,
                matches: {
                    ...state.matches,
                    scheduled: [...updatedMatches]
                }
            }
        case actionTypes.INCREASE_OR_DECREASE:
            if(state.matches.scheduled[action.index].bet[action.team] > 0 || action.op !== -1){

                const updatedMatchesIncDec = state.matches.scheduled.slice()
                updatedMatchesIncDec[action.index].bet = {
                    ...updatedMatchesIncDec[action.index].bet,
                    [action.team]: Number(updatedMatchesIncDec[action.index].bet[action.team]) + action.op
                }
                    return {
                        ...state,
                        matches: {
                            ...state.matches,
                            scheduled: [...updatedMatchesIncDec]
                        }
                    }
            } else {
                console.log('cannot update')
            }
        default:
            return state;
    }
};


export default reducer;

