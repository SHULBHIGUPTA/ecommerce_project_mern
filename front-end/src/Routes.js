import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './user/UserDashboard';
import AdminRoute from './auth/AdminRoute';
import Admindashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';
import {AdmincreateRoute, AdminproductRoute, AdminorderRoute} from './auth/AdminRoute';
import AddProduct from './admin/AddProduct';
import Shop from './core/Shop';
import Product from './core/Product';
import Cart from './core/Cart';
import Orders from './admin/Orders';
import Profile from './user/Profile';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';

const Routesdata = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/shop' exact element={<Shop/>}/>
                <Route path='/signin' exact element={<Signin/>}/>
                <Route path='/signup' exact element={<Signup/>}/>
                {/* <Route path='/user/dashboard' exact element={<PrivateRoute><Dashboard/></PrivateRoute>}/> */}
                <PrivateRoute path='/user/dashboard' exact element={<Dashboard/>}/>
                <Route path='/admin/dashboard' exact element={<AdminRoute><Admindashboard/></AdminRoute>}/>
                <Route path='/create/category' exact element={<AdmincreateRoute><AddCategory/></AdmincreateRoute>}/>
                <Route path='/create/product' exact element={<AdminproductRoute><AddProduct/></AdminproductRoute>}/>
                <Route path="/product/:productId" exact element={<Product/>}/>
                <Route path="/cart" exact element={<Cart/>}/>
                <Route path='/admin/orders' exact element={<AdminorderRoute><Orders/></AdminorderRoute>}/>
                <Route path='/profile/:userId' exact element={<PrivateRoute><Profile/></PrivateRoute>}/>
                <Route path='/admin/products' exact element={<PrivateRoute><ManageProducts/></PrivateRoute>}/>
                <Route path='/admin/product/update/:productId' exact element={<PrivateRoute><UpdateProduct/></PrivateRoute>}/>
            </Routes> 
        </BrowserRouter>
    )
}

export default Routesdata;