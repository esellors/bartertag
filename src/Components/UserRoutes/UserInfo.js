import React, {Component} from 'react';

class UserInfo extends Component {
   constructor(props) {
      super(props);
      this.state = {
          toggleDetails: ''
      };
   }
   
   render() {

      const {userId} = this.props;
      console.log(userId)

      return (
         <div>
            <h1>UserInfo</h1>
         </div>
      );
   }
}

export default UserInfo