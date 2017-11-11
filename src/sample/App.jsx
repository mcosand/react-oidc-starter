import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { signin, signout, signoutPopup, Authorization } from '../auth'

class App extends Component {
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={() => { this.props.doSignin() }}>Whoop</button>
        <button onClick={() => { this.props.doSignout() }}>De-Whoop</button>
        <button onClick={() => { this.props.doSignoutPopup() }}>De-Whoop-Pop</button>

        <Authorization check={() => true} auth={this.props.auth}>
          <div>This is authorized</div>
        </Authorization>
        <Authorization check={(profile) => profile.role && profile.role.find(r => r === 'cdb.admins')} auth={this.props.auth}>
          <div>Admin space</div>
        </Authorization>
      </div>
    );
  }
}

const storeToProps = (store) => {
  return {
    auth: store.auth
  }
}

const dispatchToProps = (dispatch, ownProps) => {
  return {
    doSignin: () => dispatch(signin()),
    doSignout: () => dispatch(signout()),
    doSignoutPopup: () => dispatch(signoutPopup())
  }
}

export default connect(storeToProps, dispatchToProps)(App);
