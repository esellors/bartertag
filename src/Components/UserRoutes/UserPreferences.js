import React, {Component} from 'react';
import {connect} from 'react-redux';
import UpdateUser from '../CommonRoutes/RegisterUpdateUser';
import UserInfo from './UserInfo';

class UserPreferences extends Component {
   render() {
      return (
         <div>
            <h1>UserPreferences</h1>
            <UpdateUser user={this.props.user} />
            <UserInfo userId={this.props.user.userId} />
         </div>
      );
   }
}

const mapStateToProps = reduxState => {
   return {
      user: reduxState.user
   }
}

export default connect(mapStateToProps)(UserPreferences)