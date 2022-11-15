import React from 'react';
import Signin from '../user/Signin';
// import Dashboard from '../user/UserDashboard';
import {isAuthenticated} from './index';

const PrivateRoute = ({element}) => {
    return isAuthenticated() ? {element} : <Signin/>;
  }

  export default PrivateRoute;