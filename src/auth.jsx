import React from 'react';
import Users from './data/users.json';

const auth = (user,password) => {
    var res=false;
    Users.users.forEach(function(puser){
        if(puser.name===user && puser.password===password){
            res=true;
            return;
        }
    });
   return res; 
  
}

export default auth;