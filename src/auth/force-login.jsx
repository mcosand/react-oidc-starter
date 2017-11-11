import PropTypes from 'prop-types'
import React, { Component } from 'react'

class ForceLogin extends Component {
  static propTypes = {
    signin: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  }
  
  componentDidMount() {
    if (!this.props.auth.hasUser && !this.props.auth.isStarting) this.props.signin();
  }

  componentWillUpdate(nextProps) {
    if (this.props.auth.isStarting && !nextProps.auth.isStarting && !nextProps.auth.hasUser) this.props.signin();
  }  


  render() {
    return this.props.auth.isStarting || (!this.props.auth.hasUser && this.props.auth.isLoading) ? <div>Loading ...</div> :
           this.props.auth.hasUser ? React.Children.only(this.props.children) :
           <div>Not logged in</div>
  }
}

export default ForceLogin