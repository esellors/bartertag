import React, {Component} from 'react';
import {connect} from 'react-redux';
import UpdateUser from '../CommonRoutes/RegisterUpdateUser';


class UserPreferences extends Component {
   render() {
      return (
         <div>
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