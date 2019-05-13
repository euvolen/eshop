import React, { Component } from 'react'
import {connect} from 'react-redux'
import {deleteUser} from '../../redux/actions/authActions'

class Settings extends Component {
  deleteUser() {
    
    if(window.confirm()){
      this.props.deleteUser()
    }
  } 
  render() {
    return (
      <div>
        <h1>Settings</h1>
        <button className="btn btn-danger" onClick={this.deleteUser.bind(this)}>DELETE USER</button>
      </div>
    )
  }
}

export default connect (null,{deleteUser})(Settings)