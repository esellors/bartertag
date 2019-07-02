import React from 'react';
import {connect} from 'react-redux';
import './styles/reset.css';
import './styles/main.css';
import guestRoutes from './Components/GuestRoutes/guestRoutes';
import userRoutes from './Components/UserRoutes/userRoutes';
import Header from './Components/CommonRoutes/Header/Header';
import GuestDashboard from './Components/GuestRoutes/GuestDashboard';
import UserDashboard from './Components/UserRoutes/UserDashboard';
import Footer from './Components/CommonRoutes/Footer';

function App(props) {

  return (
    <div>
      {
        props.isLoggedIn
        ?
          <>
            <div id='routes_top_container'>
              <Header />
              <main>
                <UserDashboard />
                {userRoutes}
              </main>
            </div>
          </>
        :
          <div id='routes_top_container'>
            <Header />
            <main>
              <GuestDashboard />
              {guestRoutes}
            </main>
          </div>
      }
      <Footer />
    </div>
  );
}

const mapStateToProps = reduxState => {
  const {user} = reduxState;
  return {isLoggedIn: user.isLoggedIn};
}

export default connect(mapStateToProps)(App);
