import { USER_EXPIRED, SILENT_RENEW_ERROR, SESSION_TERMINATED,
         USER_SIGNED_OUT, REDIRECT_SUCCESS, USER_FOUND, TOUCHING_OP } from './auth-actions'

function getBaseState() {
  return {
    isStarting: false,
    isLoading: false,
    hasUser: false,
    userLoggedOut: false,
    profile: {}
  }
}
const initialState = Object.assign({}, getBaseState(), {isStarting: true})

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case USER_EXPIRED:
        return Object.assign({}, getBaseState())
    case SILENT_RENEW_ERROR:
        return Object.assign({}, getBaseState());
    case SESSION_TERMINATED:
    case USER_SIGNED_OUT:
      return Object.assign({}, getBaseState(), { userLoggedOut: true });
    case REDIRECT_SUCCESS:
    case USER_FOUND:
      return Object.assign({}, getBaseState(), { hasUser: true }, action.payload);
    case TOUCHING_OP:
      return Object.assign({}, {...state}, { isLoading: true })

    default:
      return state;
  }
}
