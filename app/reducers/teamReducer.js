import * as types from '../actions/actionTypes';

const initialState = {
  listTeam: [],
  ID: '',
  address: '',
  avatar: '',
  name: '',
  phoneNumber: '',
  description: '',
  khunggio: '',
  level: '',
  admin: [],
  member: [],
  matchs: [],
  requestJoinTeam: [],
  images: []
};

export default function teamReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_LIST_TEAM:
      return Object.assign({}, state, { listTeam: action.listTeamInfor });

    case types.LOAD_TEAM_DATA:
      return Object.assign({}, state, action.teamData);

    case types.CHANGE_AVATAR_TEAM_PROFILE:
      return Object.assign({}, state, { avatar: action.imageURL });

    case types.ACCEPT_MATCH:
      var newMatchs = state.matchs.filter((item) => {
        if (item.ID === action.matchID) {
          item.type = "approve";
          return item;
        } else {
          return item;
        }
      });
      return Object.assign({}, state, { matchs: newMatchs });

    case types.REJECT_MATCH:
      var newMatchs = state.matchs.filter((item) => {
        if (item.ID === action.matchID) {
          item.type = "request";
          return item;
        } else {
          return item;
        }
      });
      return Object.assign({}, state, { matchs: newMatchs });

    case types.ADD_MATCH:
      return Object.assign({}, state, { matchs: [action.match, ...state.matchs] });

    case types.REMOVE_MATCH:
      var newMatchs = state.matchs.filter((item) => {
        if (item.ID !== action.matchID) {
          return item;
        }
      });
      return Object.assign({}, state, { matchs: newMatchs });

    case types.ACCEPT_MEMBER:
      var newState = Object.assign({}, state, { member: [...state.member, action.userData.shortInfor] });
      return newState;

    case types.REJECT_MEMBER:
      var newRequestJoinTeam = state.requestJoinTeam.filter((item) => {
        if (item.shortInfor.UID !== action.userData.shortInfor.UID) {
          return item;
        }
      })
      return Object.assign({}, state, { requestJoinTeam: newRequestJoinTeam });

    case types.ADD_IMAGE_TEAM_PROFILE:
      var indexOfImage = state.images.indexOf(action.oldUrl);
      if (indexOfImage === -1) {
        state.images.push(action.imageURL);
      } else {
        state.images[indexOfImage] = action.imageURL;
      }
      var newState = Object.assign({}, state, { images: state.images });
      return newState;

    default:
      return state;
  }
}
