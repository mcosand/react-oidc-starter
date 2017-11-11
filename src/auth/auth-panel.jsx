import React, { Component } from 'react';
import { connect } from 'react-redux'

class AuthPanel extends Component {
  state = {
    timer: null,
    remaining: "N/A"
  }

  updateRemaining(expiry) {
    this.setState({remaining: expiry ? expiry - Math.round(new Date() / 1000) : "N/A"})
  }

  tick() {
    this.updateRemaining(this.props.auth.expires_at)
  }

  componentDidMount() {
    this.setState({
      timer: setInterval(this.tick.bind(this), 1000)
    })
    this.updateRemaining(this.props.auth.expires_at)
  }

  componentWillUnmount() {
    if (this.state.timer) { clearInterval(this.state.timer) }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.auth.expires_at !== this.props.auth.expires_at) {
      this.updateRemaining(nextProps.auth.expires_at)
    }
  }

  render() {
    return <div style={{position:'absolute', right:0, top: 0, backgroundColor: 'white', border: 'solid 1px black'}}>
      <div><strong>User panel</strong></div>
      <div>Is Starting: {this.props.auth.isStarting+""}</div>
      <div>User Logged Out?: {this.props.auth.userLoggedOut+""}</div>
      <div>Has User: {this.props.auth.hasUser+""}</div>
      <div>Username: {this.props.auth.profile.name}</div>
      <div>Expires: {this.state.remaining}</div>
    </div>
  }
}


const storeToProps = (store) => {
  return {
    auth: store.auth,
  }
}

const dispatchToProps = (dispatch, ownProps) => {
  return {
    doIt: () => dispatch({type:'FOOP'})
    //doSignin: () => dispatch(actions.doSignin()),
    //doSignout: () => dispatch(actions.doSignout())
  }
}

export default connect(storeToProps, dispatchToProps)(AuthPanel);