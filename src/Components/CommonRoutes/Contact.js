import React, {Component} from 'react';
import Axios from 'axios';

class Contact extends Component{
   constructor(props) {
      super(props);
      this.state = {
         firstName: '',
         lastName: '',
         userEmailAddress: '',
         userEmailBody: ''
      };
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }
   handleInputChange(e) {
      const {name, value} = e.target;
            this.setState({ [name]: value })
   }
   handleSubmit(e) {
      e.preventDefault();

      const {firstName, lastName, userEmailAddress, userEmailBody} = this.state;

      if (!firstName || !lastName || !userEmailAddress || !userEmailBody) return alert('All fields are required before sending');

      const userMessage = {firstName, lastName, userEmailAddress, userEmailBody};

      Axios
         .post('/api/contact', userMessage)
         .then(res => {
            alert(res.data);
            this.props.history.goBack();
         })
         .catch(err => {
            console.log(err);
         });
   }
   render() {

      const {firstName, lastName, userEmailAddress, userEmailBody, submitDisabled} = this.state;

      return (
         <div>
            <p>Contact Us</p>
            <form>
               <label>Email Address:</label>
               <input 
                  name='userEmailAddress'
                  type='email'
                  value={userEmailAddress}
                  onChange={this.handleInputChange}
               />
               <label>First Name:</label>
               <input 
                  name='firstName'
                  type='text'
                  value={firstName}
                  onChange={this.handleInputChange}
               />
               <label>Last Name:</label>
               <input
                  name='lastName'
                  type='text'
                  value={lastName}
                  onChange={this.handleInputChange}
               />
               <label>Message:</label>
               <textarea
                  name='userEmailBody'
                  value={userEmailBody}
                  onChange={this.handleInputChange}
               />
               <button onClick={this.handleSubmit}>Send</button>
            </form>
         </div>
      );
   }
}

export default Contact