import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {categories} from '../../Data/categories';
import {connect} from 'react-redux';
import {fetchNotifications} from '../../../redux/reducers/notificationsReducer';

class Browse extends Component {
   componentDidMount() {
      const {userId, fetchNotifications} = this.props;
      fetchNotifications(userId);
   }
   
   render() {
      const categoriesMapped = categories.map((cat, i, arr) => {
         const {name, link, img} = cat;
   
         return (
            <div key={i}>
               <Link to={`/browse/${link}`}>
                  <img src={require(`../../../assets/categories/${img}`)} alt={name} />
                  <h1>{name}</h1>
               </Link>
            </div>
         );
      })
      return (
         <section>
   
            {categoriesMapped}
            
         </section>
      );
   }
}

const mapStateToProps = reduxState => {
   return {
      userId: reduxState.user.userId
   }
}

export default connect(mapStateToProps, 
   {
      fetchNotifications
   }
)(Browse)