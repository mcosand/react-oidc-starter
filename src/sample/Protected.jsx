import React, { Component } from 'react'

import { signin, ForceLogin } from '../auth'
import { connect } from 'react-redux'

class Protected extends Component {
  render() {
    return (
      <ForceLogin signin={this.props.doSignin} auth={this.props.auth}>
        <div style={{backgroundColor: 'red'}}>This content is protected</div>
      </ForceLogin>
    )
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
  }
}

export default connect(storeToProps, dispatchToProps)(Protected)