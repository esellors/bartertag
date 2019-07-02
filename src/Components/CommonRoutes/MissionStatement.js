import React from 'react';
import picPeaceSymbol from '../../assets/peace_symbol.png';

export default function MissionStatement() {
   return (
      <div class='footer_linked_component'>
         <h3>Mission Statement</h3>
         <p>We strive to:</p>
         <ul>
            <li>...bring back the joy in getting something</li>
            <li>...foster a sense of community</li>
            <li>...encourage others to think outside of the box</li>
            <li>...help reduce waste proactively</li>
            <li>...open up people to new possibilities</li>
         </ul>
         <img src={picPeaceSymbol} alt='Peace Symbol' />
         <p>Be a part of it all!</p>
      </div>
   );
};