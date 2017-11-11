import { push } from 'react-router-redux'
import { Log, UserManager } from 'oidc-client'

import { USER_FOUND, USER_EXPIRING, USER_EXPIRED,
         LOAD_USER_ERROR, SILENT_RENEW_ERROR, SESSION_TERMINATED,
         USER_SIGNED_OUT } from './auth-actions';

const userManagerConfig = Object.assign({
  redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}${window.baseUrl || '/'}loggedIn`,
  silent_redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}${process.env.PUBLIC_URL}/silent_renew.html`,
  post_logout_redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}${window.baseUrl || '/'}loggedOut`,
  response_type: 'token id_token',
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true,

  client_id: 'esar-trainingapp',
  scope: 'openid profile kcsara-profile database-api introspection',
  authority: 'https://database.kcsara.org/auth',
  //authority: 'http://localhost:4944/auth',

}, window.siteAuth);

const userManager = new UserManager(userManagerConfig);

Log.logger = console
Log.level = Log.DEBUG
export default userManager;

function bootup(store, skipLoad) {
  const starter = skipLoad
  ? Promise.resolve()
  : userManager.getUser()
    .catch(error => {
      console.error(`redux-oidc: Error in loadUser() function: ${error.message}`);
      store.dispatch({type: LOAD_USER_ERROR})
    })
    .then(user => {
      return user && !user.expired ? user : userManager.signinSilent().catch(error => {})
    })
    .then(user => {
      store.dispatch(user && !user.expired ? {type: USER_FOUND, payload: user} : { type: USER_EXPIRED })
      return user
    })
  
  starter.then(() => {
    userManager.events.addUserLoaded((user) => store.dispatch({type: USER_FOUND, payload: user}))
    userManager.events.addAccessTokenExpiring(() => store.dispatch({type: USER_EXPIRING}))
    userManager.events.addSilentRenewError((error) => store.dispatch({type: SILENT_RENEW_ERROR, payload: error}))
    userManager.events.addAccessTokenExpired(() => store.dispatch({type: USER_EXPIRED}))
    userManager.events.addUserUnloaded(() => store.dispatch({type: SESSION_TERMINATED}))
    userManager.events.addUserSignedOut(() => {
      //userManager.removeUser()
      store.dispatch({ type: USER_SIGNED_OUT })
    })
  })
}

export function initialize(store, history) {
  switch (history.location.pathname) {
    case '/loggedIn':
      bootup(store, true)
      userManager.signinRedirectCallback()
      .then((user) => {
        store.dispatch({type:'auth/REDIRECT_SUCCESS', payload: user})
        store.dispatch(push(sessionStorage.redirect || '/'))
      })
      break;
    case '/loggedOut':
      const logoutRedirect = sessionStorage.logoutRedirect

      if (logoutRedirect) {
        sessionStorage.removeItem('logoutRedirect')
        bootup(store)
        store.dispatch(push(logoutRedirect))
      } else {
        window.close();
      }
      break;

    default:
      bootup(store)
  }
}

