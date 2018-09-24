import React from 'react';

import { Query } from 'react-apollo';
import {GET_RECIPE} from '../../queries';

// withRouter kullandi anlatici fakat kullanmadanda oluyor. match datasi geciyor

const RecipePage = ({match}) => {
   const {_id} = match.params;
   return (
      <Query query={GET_RECIPE} variables={{_id}}>
         {({data, loading, error}) => {
            if(loading) return <div>loading</div>
            if(error) return <div>error</div>
            console.log('get recipe ',data);
            return(
               <div className='App'>
                  <h2>{data.getRecipe.name}</h2>
                  <p>Category: {data.getRecipe.category}</p>
                  <p>Description: {data.getRecipe.description}</p>
                  <p>Instructions: {data.getRecipe.instructions}</p>
                  <p>Likes: {data.getRecipe.likes}</p>
                  <p>Created By: {data.getRecipe.username}</p>
                  <button>Like</button>
               </div>
            )
         }}

      </Query>
   )
};

export default RecipePage;