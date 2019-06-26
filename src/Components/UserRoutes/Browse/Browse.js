import React from 'react';
import {Link} from 'react-router-dom';
import {categories} from '../../Data/categories';

function Browse() {
   const categoriesMapped = categories.map((cat, i, arr) => {
      const {name, link, img} = cat;

      return (
         <div key={i}>
            <Link to={`/browse/${link}`}>
               <img src={require(`../../../assets/categories/${img}`)} alt={name} />
               <h1>{name}</h1>
            </Link>
         </div>
      )
   })

   return (
      <section>

         {categoriesMapped}
         
      </section>
   );
}

export default Browse