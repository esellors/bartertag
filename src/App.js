import React from 'react';
import {connect} from 'react-redux';
import './reset.css';
import './index.css';
import guestRoutes from './Components/GuestRoutes/guestRoutes';
import userRoutes from './Components/UserRoutes/userRoutes';
import Header from './Components/CommonRoutes/Header/Header';
import GuestDashboard from './Components/GuestRoutes/GuestDashboard';
import UserDashboard from './Components/UserRoutes/UserDashboard';
import Footer from './Components/CommonRoutes/Footer';

function App(props) {

  return (
    <div>
      <Header />
      <main>
        {
          props.isLoggedIn
          ?
            <>
              <UserDashboard />
              {userRoutes}
            </>
          :
            <>
              <GuestDashboard />
              {guestRoutes}
            </>
        }
      </main>
      <Footer />
    </div>
  );
}

const mapStateToProps = reduxState => {
  const {user} = reduxState;
  return {isLoggedIn: user.isLoggedIn};
}

export default connect(mapStateToProps)(App);
