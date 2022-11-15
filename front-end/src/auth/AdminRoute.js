import React from 'react';
import Admindashboard from '../user/AdminDashboard';
// import Signin from '../user/Signin';
import {isAuthenticated} from './index';
import Home from '../core/Home';
import AddCategory from '../admin/AddCategory';
import AddProduct from '../admin/AddProduct';
import Orders from '../admin/Orders';



const AdminRoute = () => {
    return isAuthenticated() && isAuthenticated().user.role === 1 ? <Admindashboard/> : <Home/>;
  }

export const AdmincreateRoute = () => {
    return isAuthenticated() && isAuthenticated().user.role === 1 ? <AddCategory/> : <Home/>;
}

export const AdminproductRoute = () => {
    return isAuthenticated() && isAuthenticated().user.role === 1 ? <AddProduct/> : <Home/>;
}

export const AdminorderRoute = () => {
    return isAuthenticated() && isAuthenticated().user.role === 1 ? <Orders/> : <Home/>;
}


export default AdminRoute