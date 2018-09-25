import React from 'react';
import {Link} from 'react-router-dom';

const formatDate = date => {
   const newDate = new Date(date).toLocaleDateString('tr-TR');
   const newTime = new Date(date).toLocaleTimeString('tr-TR');
   return `${newDate} at ${newTime}`
}

const UserInfo = ({session}) => (
   <div>
      <h3>user info</h3>
      <p>Username: {session.getCurrentUser.username} </p>
      <p>Email: {session.getCurrentUser.email} </p>
      <p>Join Date: {formatDate(session.getCurrentUser.joinDate)} </p>
      <ul>
         <h3>{session.getCurrentUser.username}'s Favorites</h3>
         {session.getCurrentUser.favorites.map(favorite => (
            <li>
               <Link to={`/recipes/${favorite._id}`}>
                  <p>{favorite.name}</p>
               </Link>
            </li>
         ))}
         {!session.getCurrentUser.favorites.length && (
            <p><strong>you have no favorites currently. go add some!</strong></p>
         )}
      </ul>
   </div>
);

export default UserInfo;