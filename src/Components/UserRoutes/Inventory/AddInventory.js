import React, {Component} from 'react';
import Axios from 'axios';
import {connect} from 'react-redux';
import FormValidation from '../Validation/FormValidation';

class AddInventory extends Component {
   constructor(props) {
      super(props);
      this.state = {
         submitDisabled: false,
         item_category: '',
         item_condition: '',
         item_name: '',
         item_desc: '',
         selectedImg: null,
         selectedImgFileUrl: null,
         inputKey: Date.now(),
         formValidationErrors: []
      };
      this.inputChangeHandler = this.inputChangeHandler.bind(this);
      this.imgUploadHandler = this.imgUploadHandler.bind(this);
      this.clearImgHandler = this.clearImgHandler.bind(this);
      this.clearFormHandler = this.clearFormHandler.bind(this);
      this.formValidation = this.formValidation.bind(this);
   }
   inputChangeHandler(e) {
      if (e.target.name === 'img_btn') {
         this.setState({ 
            selectedImg: e.target.files[0],
            selectedImgFileUrl: URL.createObjectURL(e.target.files[0])
         });
      } else {
         this.setState({ [e.target.name]: e.target.value });
      };
   }
   clearImgHandler() {
      this.setState({ 
         selectedImg: null,
         selectedImgFileUrl: null,
         inputKey: Date.now()
      });
   }
   clearFormHandler(e) {
      if (e) e.preventDefault();
      const formItems = ['item_category', 'item_condition', 'item_name', 'item_desc', 'selectedImg'];

      formItems.forEach(el => {
         if (el === 'selectedImg') {
            this.setState({ 
               selectedImg: null,
               selectedImgFileUrl: null,
               inputKey: Date.now()
            });
         } else {
            this.setState({ [el]: '' })
         };
      });
   }
   formValidation(e) {
      e.preventDefault();

      this.setState({ 
         submitDisabled: true,
         formValidationErrors: []
      });

      const state = {...this.state};
      const errorsFound = [];

      for (let key in state) {
         switch(key) {
            case 'item_category':
               if (!state[key]) errorsFound.push('No category chosen');
               break;
            case 'item_condition':
               if (!state[key]) errorsFound.push('No item condition chosen');
               break;
            case 'item_name':
               if (!state[key]) errorsFound.push('No item name entered');
               break;
            case 'item_desc':
               if (!state[key]) errorsFound.push('No description entered');
               break;
            case 'selectedImg':
               if (!state[key]) {
                  errorsFound.push('No image chosen');
               } else if (
               state[key].type !== 'image/jpg' &&
               state[key].type !== 'image/jpeg' &&
               state[key].type !== 'image/png') {
                  errorsFound.push('Image chosen not of type jpg, jpeg, or png');
               } else if (state[key].size > 4000000) {
                  errorsFound.push('Image larger than 4 mb limit')
               }
               break;
            default: break;
         }
      };
      if (errorsFound.length > 0) {
         this.setState({ 
            submitDisabled: false,
            formValidationErrors: errorsFound
         });
      } else {
         this.imgUploadHandler();
      };
   }
   imgUploadHandler() {
      const data = new FormData();
      data.append('image', this.state.selectedImg, this.state.selectedImg.name);

      Axios
         .post('/api/inventory/img/add', data, {
            headers: {
               'accept': 'application/json',
               'Accept-Language': 'en-US,en;q=0.8',
               'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            }
         })
         .then(res => {
            const {img_aws_key, img_aws_url} = res.data;
            this.submitItemHandler(img_aws_key, img_aws_url);
         })
         .catch(err => {
            console.log(err.request);
            alert(err.request.responseText);
            this.clearImgHandler();
            this.setState({ submitDisabled: false });
            });
   }
   submitItemHandler(img_aws_key, img_aws_url) {
      const {item_category, item_condition, item_name, item_desc} = this.state;
      const {user_id} = this.props;

      const newItem = {user_id, item_category, item_condition,item_name, item_desc, img_aws_key, img_aws_url};

      Axios
         .post('/api/inventory/details/add', newItem)
         .then(() => {
            this.clearFormHandler();
            this.setState({ submitDisabled: false });
            alert('Item added!');
         })
         .catch(err => {
            console.log(err);
            this.setState({ submitDisabled: false });
         });
   }
   render() {
      return (
         <form>
            <h1>Add to Your Inventory</h1>

            <div>
               <label htmlFor='item_category'>Category</label>
               <select 
                  name='item_category' 
                  id='item_category' 
                  value={this.state.item_category}
                  onChange={this.inputChangeHandler}
               >
                  <option value='' disabled>Choose:</option>
                  <option value='auto_accessories'>Auto Accessories</option>
                  <option value='baby'>Baby</option>
                  <option value='beauty'>Beauty</option>
                  <option value='clothing'>Clothing</option>
                  <option value='computer'>Computer</option>
                  <option value='electronics'>Electronics</option>
                  <option value='fitness'>Fitness</option>
                  <option value='furniture'>Furniture</option>
                  <option value='home_accessories'>Home Accessories</option>
                  <option value='jewelry'>Jewelry</option>
                  <option value='office'>Office</option>
                  <option value='outdoor'>Outdoor</option>
                  <option value='tools'>Tools</option>
                  <option value='toys'>Toys</option>
                  <option value='other'>-Other-</option>
               </select>
            </div>
         
            <div>
               <label>Condition</label>
               <div>
                  <input 
                     type='radio' 
                     name='item_condition' 
                     value='1' 
                     onChange={this.inputChangeHandler}
                     checked={this.state.item_condition === '1'}
                  />1 - Poor 
               </div>
               <div>
                  <input 
                     type='radio' 
                     name='item_condition' 
                     value='2' 
                     onChange={this.inputChangeHandler}
                     checked={this.state.item_condition === '2'}
                  />2 - Fair
               </div>
               <div>
                  <input 
                     type='radio' 
                     name='item_condition' 
                     value='3' 
                     onChange={this.inputChangeHandler}
                     checked={this.state.item_condition === '3'}
                  />3 - Good 
               </div>
               <div>
                  <input 
                     type='radio' 
                     name='item_condition' 
                     value='4' 
                     onChange={this.inputChangeHandler}
                     checked={this.state.item_condition === '4'}
                  />4 - Great
               </div>
               <div>
                  <input 
                     type='radio' 
                     name='item_condition' 
                     value='5' 
                     onChange={this.inputChangeHandler}
                     checked={this.state.item_condition === '5'}
                  />5 - Excellent
               </div>
            </div>
            
            <div>
               <label htmlFor='item_name'>Item Name, Year, Model, etc.</label>
               <input 
                  type='text' 
                  name='item_name' 
                  id='item_name' 
                  value={this.state.item_name} 
                  onChange={this.inputChangeHandler}
                  autoFocus 
               />
            </div>

            <div>
               <label htmlFor='item_desc'>Description, Features, Flaws, etc.</label>
               <textarea 
                  name='item_desc' 
                  id='item_desc' 
                  value={this.state.item_desc} 
                  onChange={this.inputChangeHandler}
                  maxLength='2500'
                  />
            </div>

            <div>
               <div id='img_preview'>
                  {
                     this.state.selectedImgFileUrl
                     ?
                        <img src={this.state.selectedImgFileUrl} alt='Item Preview' />
                     :  null
                  }
                  
               </div>
               <div>
                  <p>
                     Image size and requirements: size, type, no file chosen
                  </p>
                  <input 
                     type='file' 
                     name='img_btn'
                     onChange={this.inputChangeHandler} 
                     key={this.state.inputKey}
                  />
               </div>
            </div>

            <div>
               <span>
                  {
                     this.state.formValidationErrors.length > 0
                     ?
                        <FormValidation errors={this.state.formValidationErrors} 
                     />
                     :  null
                  }
               </span>
               <span>
                  <button onClick={this.clearFormHandler}>Clear All</button>
                  <button disabled={this.state.submitDisabled} onClick={this.formValidation}>Add Item</button>
               </span>
            </div>
         </form>
      );
   }
}

const mapStateToProps = reduxState => {
   return {
      user_id: reduxState.user.userId
   }
}

export default connect(mapStateToProps)(AddInventory)