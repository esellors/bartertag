import React from 'react';
import {connect} from 'react-redux';
import './styles/reset.css';
import './styles/main.css';
import guestRoutes from './Components/GuestRoutes/guestRoutes';
import userRoutes from './Components/UserRoutes/userRoutes';
import Referrer from './Components/Referrer/Referrer';
import Header from './Components/CommonRoutes/Header/Header';
import GuestDashboard from './Components/GuestRoutes/GuestDashboard';
import UserDashboard from './Components/UserRoutes/UserDashboard';
import Footer from './Components/CommonRoutes/Footer';

function App(props) {

  return (
    <>
      <div id='routes_top_container'>
      { document.referrer !== 'https://www.esellors.com/' ? <Referrer /> : null }
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
