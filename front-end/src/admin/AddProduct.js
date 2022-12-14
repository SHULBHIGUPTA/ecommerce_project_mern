import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import {Link} from 'react-router-dom';
import {createProductData, getCategories} from './apiAdmin';

const AddProduct = () => {
    const {user, token} = isAuthenticated();
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: '',
        error: '',
        createProduct: '',
        redirectToProfile: false,
        formData: ''
    })

    const {  name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    createProduct,
    redirectToProfile,
    formData } = values;

    //load categories and set form data
    const init = () => {
        getCategories().then(data => {
            if(data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({...values, categories: data, formData: new FormData()})
            }
        })
    }

    useEffect(() => {
       init()
    }, [])

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({...values, [name]: value})
    }

    const clickSubmit = (e) => {
    e.preventDefault()
    setValues({...values, error: '', loading: true})
    createProductData(user._id, token, formData)
    .then(data => {
        if(data.error) {
            setValues({...values, error: data.error})
        } else {
            setValues({
                ...values, name: '', description: '', photo: '',
                price: '', quantity: '', loading: false,
                createProduct: data.name
            })
        }
    })

    }

    return (
        <Layout title="Add a new product" description={`G'day ${user.name}, ready to add a new category`}>
        <div className='row'>
        <div className="col-md-8 offset-md-2">
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
        {error}
        </div>
        <div className="alert alert-danger" style={{display: createProduct ? '' : 'none'}}>
        <h2>{`${createProduct}`} is created!</h2>
        </div>
        {loading && (<div className="alert alert-success">
        <h2>Loading...</h2>
        </div>)}
        <form onSubmit={clickSubmit}>
            <div className="form-group">
            <label className='btn btn-secondary'>
                <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*"/>
            </label>
            <div className="form-group">
            <label className="text-muted">Name</label>
            <input onChange={handleChange('name')} type="text" className="form-control" value={name}/>
 
            </div>
            <div className="form-group">
            <label className="text-muted">Description</label>
            <textarea onChange={handleChange('description')}  className="form-control" value={description}/>
            </div>
            <div className="form-group">
            <label className="text-muted">price</label>
            <input onChange={handleChange('price')}  type="number" className="form-control" value={price}/>
            </div>
            <div className="form-group">
            <label className="text-muted">Category</label>
            <select onChange={handleChange('category')}  className="form-control">
            <option>please select</option>
            {categories && categories.map((c, i) => (
                <option key={i} value={c._id}>{c.name}</option>
            ))}
            </select>
            </div>
            <div className="form-group">
            <label className="text-muted">shipping</label>
            <select onChange={handleChange('shipping')}  className="form-control">
                <option value="0">No</option>
                <option value="1">Yes</option>
            </select>
            </div>
            <div className="form-group">
            <label className="text-muted">Quantity</label>
            <input onChange={handleChange('quantity')}  
            type="number" className="form-control" value={quantity}/>
            </div>
            <button className="btn btn-outline-primary" type="submit">Create Product</button>
             </div>
            
        </form>
        <div className="mt-5">
        <Link to='/admin/dashboard' className="text-warning">Back to Dashboard</Link>
        </div>
        </div>
        </div>
        </Layout>
    )
}
export default AddProduct;