import React from 'react';

function FormValidation(props) {

   const errors = props.errors.map((error, i) => {
      return (
         <li key={`error_${i}`}>{error}</li>
      );
   });

   return (
      <>
         <p>
            Please fix the following errors before submitting:
         </p>
         <ul>
            {errors}
         </ul>
      </>
   );
}

export default FormValidation