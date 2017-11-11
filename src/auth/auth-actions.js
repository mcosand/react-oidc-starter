import userManager from './user-manager'

export const USER_EXPIRED = 'auth/USER_EXPIRED';
export const REDIRECT_SUCCESS = 'auth/REDIRECT_SUCCESS';
export const USER_LOADED = 'auth/USER_LOADED';
export const SILENT_RENEW_ERROR = 'auth/SILENT_RENEW_ERROR';
export const SESSION_TERMINATED = 'auth/SESSION_TERMINATED';
export const USER_EXPIRING = 'auth/USER_EXPIRING';
export const USER_FOUND = 'auth/USER_FOUND';
export const LOADING_USER = 'auth/LOADING_USER';
export const USER_SIGNED_OUT = 'auth/USER_SIGNED_OUT';
export const LOAD_USER_ERROR = 'auth/LOAD_USER_ERROR';
export const TOUCHING_OP = 'auth/TOUCHING_OP'

export function signin() {
  sessionStorage.setItem('redirect', window.location.pathname)
  userManager.signinRedirect();
  return { type: TOUCHING_OP }
}

export function signout() {
  sessionStorage.setItem('logoutRedirect', '/')
  userManager.signoutRedirect()
  return { type: TOUCHING_OP }
}

export function signoutPopup() {
  sessionStorage.removeItem('logoutRedirect')
  userManager.signoutPopup().catch(() => {})
  return { type: TOUCHING_OP }
}