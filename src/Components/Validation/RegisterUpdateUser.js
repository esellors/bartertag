export default function registerUserValidation(state, isLoggedIn) {

   let errorsFound = [];

   for (let key in state) {
      switch(key) {
         case 'firstName':
            if (!state[key]) errorsFound.push('First name empty');
            break;
         case 'lastName':
            if (!state[key]) errorsFound.push('Last name empty');
            break;
         case 'username':
            if (!state[key]) errorsFound.push('No username chosen');
            break;
         case 'email':
            if (!state[key]) {
               errorsFound.push('No email entered');
            } else if (
            state[key].indexOf('@') === -1 ||
            state[key].indexOf('.') === -1) {
               errorsFound.push('Email should include both "@" and "."');
            };
            break;
         case 'city':
            if (!state[key]) errorsFound.push('No city entered');
            break;
         case 'state':
            if (!state[key]) errorsFound.push('No state chosen');
            break;
         case 'password':
            if (isLoggedIn === false || (isLoggedIn === true && state[key].length > 0)) {
               if (!state[key]) {
                  errorsFound.push('No password chosen')
               } else if (!!state[key]) {
                  if (state[key].indexOf(state.username) !== -1) {
                     errorsFound.push('Password should not include username')
                  } else if (state[key].length < 8) {
                     errorsFound.push('Password should be between 8 and 40 characters long')
                  };
               };
            };
            break;
         default: break;
      };
   };

   return errorsFound;

};