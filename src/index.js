import 'babel-polyfill/dist/polyfill.js'
import React from 'react'
import ReactDOM from 'react-dom'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import store, { history } from './store'
import registerServiceWorker from './registerServiceWorker'

import './index.css'

// begin sample
import AuthPanel from './auth/auth-panel'
import App from './sample/App'
import Protected from './sample/Protected'
// end sample


const router = (
   <ConnectedRouter history={history}>
    <div>
      {/* begin sample */}
      <AuthPanel store={store} />
      <Route component={App}/>
      <Route exact path='/protected' component={Protected}/>
      {/* end sample */}
    </div>
   </ConnectedRouter>
)

ReactDOM.render(
  <Provider store={store}>
  {router}
  </Provider>, document.getElementById('root'));

//registerServiceWorker()
