export default function inventoryValidation(state) {

   let errorsFound = [];

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
         case 'selectedImgFileUrl':
            if (!state[key]) {
               errorsFound.push('No image chosen');
            } else if (state.selectedImg) {
               if (
               state.selectedImg.type !== 'image/jpg' &&
               state.selectedImg.type !== 'image/jpeg' &&
               state.selectedImg.type !== 'image/png') {
                     errorsFound.push('Image chosen not of type jpg, jpeg, or png');
               } else if (state.selectedImg.size > 4000000) {
                  errorsFound.push('Image larger than the 4 mb limit')
               }
            }
            break;
         default: break;
      };
   };

   return errorsFound;

};