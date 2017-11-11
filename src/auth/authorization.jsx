import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Authorization extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    check: PropTypes.func,
    deniedText: PropTypes.string
  }
  
  render() {
    const { auth, check, deniedText } = this.props

    return (auth.isStarting || (auth.isLoading && !auth.hasUser)) ? null
         : auth.hasUser && (!check || check(auth.profile)) ? React.Children.only(this.props.children)
         : deniedText ? <div>{deniedText}</div> : null
  }
}

export default Authorization