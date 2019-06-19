import React from 'react';
import {connect} from 'react-redux';
import './reset.css';
import './index.css';
import guestRoutes from './Components/GuestRoutes/guestRoutes';
import userRoutes from './Components/UserRoutes/userRoutes';
import Header from './Components/Header/Header';
import Footer from './Components/Footer';

function App(props) {

  const routes = props.isLoggedIn ? userRoutes : guestRoutes;

  return (
    <div>
      <Header />
      {routes}
      <Footer />
    </div>
  );
}

const mapStateToProps = reduxState => {
  const {user} = reduxState;
  return {isLoggedIn: user.isLoggedIn};
}

export default connect(mapStateToProps)(App);
