import * as types from '../actions/actionTypes';

const initialState = {
  name: '',
  email: '',
  phoneNumber: '+84',
  password: '',
  rePassword: '',
  phoneOrEmail: '',
  error: ''
};

export default function formReducer(state = initialState, action) {
  switch (action.type) {

    case types.CHANGE_NAME:
      return Object.assign({}, state, { name: action.name });

    case types.CHANGE_EMAIL:
      return Object.assign({}, state, { email: action.email });

    case types.CHANGE_PHONE_NUMBER:
      return Object.assign({}, state, { phoneNumber: action.phoneNumber });

    case types.CHANGE_PASSWORD:
      return Object.assign({}, state, { password: action.password });

    case types.CHANGE_REPASSWORD:
      return Object.assign({}, state, { rePassword: action.rePassword });

    case types.CHANGE_PHONE_OR_EMAIL:
      return Object.assign({}, state, { phoneOrEmail: action.phoneOrEmail });

    case types.CHANGE_LOGIN_ERROR:
      return Object.assign({}, state, { error: action.error });

    default:
      return state;
  }

}
