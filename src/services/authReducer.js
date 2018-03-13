import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  AUTH_SUCCESS,
  RESET_AUTH_STATE,
  SHOW_LOADING,
  HIDE_LOADING
} from '../actions/types';

const INITIAL_STATE = {
  authenticated: false,
  error: '',
  success: '',
  authUserRoles: '',
  loading: false
};

// auth reducers for updating the redux state depending on action type
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        error: '',
        authenticated: true,
        authUserRoles: action.payload.role
      };
    case UNAUTH_USER:
      return {
        ...state,
        authenticated: false,
        authUserRoles: '',
        error: action.payload
      };
    case AUTH_ERROR:
      return { ...state, success: '', error: action.payload };
    case AUTH_SUCCESS:
      return { ...state, success: action.payload, error: '' };
    case RESET_AUTH_STATE:
      return { ...state, success: '', error: '' };
    case SHOW_LOADING:
      return { ...state, loading: true };
    case HIDE_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
}
