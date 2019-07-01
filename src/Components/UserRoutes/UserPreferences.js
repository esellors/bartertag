import React, {Component} from 'react';
import {connect} from 'react-redux';
import UpdateUser from '../CommonRoutes/RegisterUpdateUser';


class UserPreferences extends Component {
   render() {
      return (
         <div>
            <h1>UserPreferences</h1>
            <UpdateUser user={this.props.user} />
            
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