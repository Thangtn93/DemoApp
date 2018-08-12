import * as types from '../actions/actionTypes';

const initialState = {
    location: 'Hà Nội',
    date: new Date(),
    time: 1,
    typePitch: '7',
    // tilekeo: '2 - 3 - 4',
    // khuvuc: '',
    // san: 1,
    searchResult: [],
    matchProfile: {},
    team2: {},
};

const pitchReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.CHANGE_FIND_PITCH_LOCATION:
            return Object.assign({}, state, { location: action.location });

        case types.CHANGE_FIND_PITCH_DATE:
            return Object.assign({}, state, { date: action.date });

        case types.CHANGE_FIND_PITCH_TIME:
            return Object.assign({}, state, { time: action.time });

        case types.CHANGE_FIND_PITCH_TYPE_PITCH:
            return Object.assign({}, state, { typePitch: action.typePitch });

        // case types.CHANGE_FIND_PITCH_TILEKEO:
        //     return Object.assign({}, state, { tilekeo: action.tilekeo });

        // case types.CHANGE_FIND_PITCH_KHU_VUC:
        //     return Object.assign({}, state, { khuvuc: action.khuvuc });

        // case types.CHANGE_FIND_PITCH_SAN:
        //     return Object.assign({}, state, { san: action.san });

        case types.FIND_PITCH_RESULT:
            return Object.assign({}, state, { searchResult: action.results });

        case types.REMOVE_ITEM_PITCH_RESULT:
            var newmatchs = state.searchResult.filter((item) => {
                if (item.ID !== action.match.ID) {
                    return item;
                }
            })
            return Object.assign({}, state, { searchResult: newmatchs });

        case types.LOAD_MATCH_PROFILE:
            return Object.assign({}, state, { matchProfile: action.matchProfile });

        case types.LOAD_TEAM2_INFOR:
            return Object.assign({}, state, { team2: action.team2 });

        default:
            return state;
    }
}

export default pitchReducer;
