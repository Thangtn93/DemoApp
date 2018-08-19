import * as types from '../actions/actionTypes';

const initialState = {
    member: [],
};

const leagueReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOAD_TEAM_MEMBER:
            return Object.assign({}, state, { member: action.member });

        default:
            return state;
    }

}

export default leagueReducer;
