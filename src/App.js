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
    <>
      <div id='routes_top_container'>
        <Header />
        <main>
          {
            props.isLoggedIn
              ? (
                <>
                  <UserDashboard />
                  {userRoutes}
                </>
              ) : (
                <>
                  <GuestDashboard />
                  {guestRoutes}
                </>
              )
          }
        </main>
      </div>
      <Footer />
    </>
  );
}

const mapStateToProps = reduxState => {
  const {user} = reduxState;
  return {isLoggedIn: user.isLoggedIn};
}

export default connect(mapStateToProps)(App);
