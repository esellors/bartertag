import React, {Component} from 'react';
import Axios from 'axios';

class AddInventory extends Component {
   constructor(props) {
      super(props);
      this.state = {
          selectedImg: null
      };
      this.selectedImgHandler = this.selectedImgHandler.bind(this);
      this.selectedImgUpload = this.selectedImgUpload.bind(this);
   }
   selectedImgHandler(e) {
      this.setState({ selectedImg: e.target.files[0] });
   }
   selectedImgUpload() {
      const data = new FormData();
      // If file selected
      if (this.state.selectedImg) {
         data.append('image', this.state.selectedImg, this.state.selectedImg.name);
         Axios
            .post( '/api/files/image-upload', data, {
               headers: {
                  'action': 'upload',
                  'accept': 'application/json',
                  'Accept-Language': 'en-US,en;q=0.8',
                  'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
               }
            })
         .then( ( res ) => {
            if ( 200 === res.status ) {
               // If file size is larger than expected.
               if( res.data.error ) {
                  if ('LIMIT_FILE_SIZE' === res.data.error.code) {
                     alert('Max size: 4MB');
                  } else {
                     console.log( res.data );
                     // If not the given file type
                     alert(res.data.error);
                  }
               } else {
               // Success
                  let fileName = res.data;
                  console.log( 'file data: ', fileName );
                  alert('File uploaded');
               }
            }
         })
         .catch( ( err ) => {
            // If another error
            alert(err);
         });
      } else {
         // if file not selected throw error
         alert('Please select file');
      }
   }
   render() {
      return (
         <div>
            <h1>AddInventory</h1>
            <h3>Choose image:</h3>
            <p>
               Image size and requirements: size, type, no file chosen
            </p>
            <input 
               name='testtest'
               type='file' 
               onChange={this.selectedImgHandler} />
            <button onClick={this.selectedImgUpload}>Upload</button>
         </div>
      );
   }
}

export default AddInventory