import React, {Component} from 'react';
import Axios from 'axios';
import {connect} from 'react-redux';
import {setTargetItem, updateInventory} from '../../../redux/reducers/inventoryReducer';
import {categories} from '../../Data/categories';
import inventoryValidation from '../../Validation/UpdateInventory';
import DisplayValidationErrors from '../../Validation/DisplayErrors';

class UpdateInventory extends Component {
   constructor(props) {
      super(props);
      this.state = {
         uneditedItemInfo: {},
         submitDisabled: false,
         item_category: '',
         item_condition: '',
         item_name: this.props.match.params.item_name || '',
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
      this.submitItemHandler = this.submitItemHandler.bind(this);
      this.setTargetItemValues = this.setTargetItemValues.bind(this);
   }
   componentDidMount() {
      if (this.props.match.params.itemId) { // if Edit mode
         this.setTargetItemValues();
      }
   }
   setTargetItemValues(e) {
      if (e) e.preventDefault();

      const setTargetItem = async function(itemId) {
         await this.props.setTargetItem(itemId)

         if (this.props.targetItem) {
            const {item_category, item_condition, item_desc, item_name, img_aws_url, img_aws_key} = this.props.targetItem; 
   
            this.setState({
               uneditedItemInfo: {item_category, item_condition, item_desc, item_name, img_aws_key, selectedImgFileUrl: img_aws_url},
               formValidationErrors: [],
               item_category, item_condition, item_desc, item_name,
               selectedImgFileUrl: img_aws_url,
            })
         }
      }

      setTargetItem.call(this, this.props.match.params.itemId)

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
   submitItemHandler(e) {
      e.preventDefault();
      const button = e.target.name;

      this.setState({ submitDisabled: true }); // Disable double clicking

      // begin inputs validation
      const errorsFound = inventoryValidation({...this.state});

      if (errorsFound.length > 0) {
         return this.setState({ 
            submitDisabled: false,
            formValidationErrors: errorsFound 
         });
      };
      // end inputs validation

      // Begin if Edit mode
      if (button === 'saveChangesBtn') { 
         const {item_category, item_condition, item_desc, item_name} = this.state.uneditedItemInfo;

         const prevItemDetails = {item_category, item_condition, item_desc, item_name};
         const newerItemDetails = {
            item_category: this.state.item_category, 
            item_condition: this.state.item_condition, 
            item_desc: this.state.item_desc, 
            item_name: this.state.item_name
         }
      
         if (!this.state.selectedImg && JSON.stringify(prevItemDetails) === JSON.stringify(newerItemDetails)) { // Disable submit with no changes
            return this.setState({
               submitDisabled: false,
               formValidationErrors: ['No changes have been made']
            });
         }
         return this.imgUploadHandler(true);
      } 
      // End if Edit mode

      this.imgUploadHandler(false);

   }
   imgUploadHandler(editMode) {

      if (editMode && !this.state.selectedImg) { // if Edit mode w/ no pic change
         return this.detailsUploadHandler(null, null, true);
      }

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

            // if Edit mode w/ new pic then delete old pic
            if (editMode) { 
               const {img_aws_key: key} = this.state.uneditedItemInfo;

               // Delete old Photo
               Axios
                  .delete('/api/inventory/img/delete', { data: {key: [{key}]} })
                  .catch(err => {
                     console.log(err.request);
                     this.clearImgHandler();
                     this.setState({ 
                        formValidationErrors: err.request.responseText,
                        submitDisabled: false 
                     });
                  });
               return this.detailsUploadHandler(img_aws_key, img_aws_url, true);
            }
            // end old pic delete

            this.detailsUploadHandler(img_aws_key, img_aws_url, false);
         })
         .catch(err => {
            console.log(err.request);
            this.clearImgHandler();
            this.setState({ 
               formValidationErrors: err.request.responseText,
               submitDisabled: false 
            });
         });
   }
   detailsUploadHandler(img_aws_key, img_aws_url, editMode) {
      const {item_category, item_condition, item_name, item_desc} = this.state;
      const {userId} = this.props;

      const item = {user_id: userId, item_category, item_condition, item_name, item_desc, 
         user_item_id: parseInt(this.props.match.params.itemId) || null,
         img_aws_key: img_aws_key || null, 
         img_aws_url: img_aws_url || null
      };

      // if Edit mode, change existing item details in db
      if (editMode) { 
         Axios
            .put('/api/inventory/details/update', item)
            .then(() => {
               // this.clearFormHandler();
               // this.setState({ submitDisabled: false });
               alert('Item Updated');
               this.props.updateInventory(userId);
               this.props.history.push('/inventory');
            })
            .catch(err => {
               console.log(err);
               this.setState({ 
                  formValidationErrors: err.request.responseText,
                  submitDisabled: false 
               });
            });
      } else { //if not Edit mode, add new item to db
         Axios
            .post('/api/inventory/details/add', item)
            .then(() => {
               this.clearFormHandler();
               this.setState({ submitDisabled: false });
               this.props.updateInventory(userId);
               alert('Item Added');
            })
            .catch(err => {
               console.log(err.request);
               this.setState({ 
                  formValidationErrors: err.request.responseText,
                  submitDisabled: false 
               });
            });
      }
   }
   render() {

      const categoriesMapped = categories.map((cat, i) => {
         return <option value={cat.value} key={i}>{cat.name}</option>
      })

      return (
         <form className='inventory_item'>
            {
               this.props.match.params
               ?
                  <h1>Update Item</h1>
               :
                  <h1>Add Item</h1>
            }
            <div>
               <label htmlFor='item_category'>Category</label>
               <select 
                  name='item_category' 
                  id='item_category' 
                  value={this.state.item_category}
                  onChange={this.inputChangeHandler}
               >
                  <option value='' disabled>Choose:</option>
                  {categoriesMapped}
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
                  maxLength='250'
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
                  <input 
                     type='file' 
                     name='img_btn'
                     onChange={this.inputChangeHandler} 
                     key={this.state.inputKey}
                  />
               </div>
            </div>

            <div className='update_inventory_submit_section'>
               <span>
                  {
                     this.state.formValidationErrors.length > 0
                     ?
                        <DisplayValidationErrors errors={this.state.formValidationErrors} 
                     />
                     :  null
                  }
               </span>

               {
                  this.props.match.params.itemId // if true, then edit mode
                  ?
                     <span className='update_inv_btns'>
                        <button onClick={this.setTargetItemValues}>Clear Changes</button>
                        <button name='saveChangesBtn' disabled={this.state.submitDisabled} onClick={this.submitItemHandler}>Save</button>
                     </span>
                  :
                     <span className='update_inv_btns'>
                        <button onClick={this.clearFormHandler}>Clear All</button>
                        <button disabled={this.state.submitDisabled} onClick={this.submitItemHandler}>Add Item</button>
                     </span>
               }
            </div>
         </form>
      );
   }
}

const mapStateToProps = reduxState => {
   return {
      userId: reduxState.user.userId,
      targetItem: reduxState.inventory.targetItem
   }
}

export default connect(mapStateToProps,
   {
      updateInventory,
      setTargetItem
   }
)(UpdateInventory)


