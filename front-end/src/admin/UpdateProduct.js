import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import {Link, useNavigate} from 'react-router-dom';
import {createProductData, getCategories, getProduct, updateProduct} from './apiAdmin';

const UpdateProduct = ({match}) => {
    const {user, token} = isAuthenticated();
    const navigate = useNavigate;
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

    const init = (productId) => {
        getProduct(productId).then(data => {
            if(data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({...values, 
                    name: data.name, 
                    price: data.price, 
                    category: data.category._id,
                    shipping: data.shipping,
                    quantity: data.quantity,
                    formData: new FormData()
                
                })
                initCategories()
            }
        })
    }

    //load categories and set form data
    const initCategories = () => {
        getCategories().then(data => {
            if(data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({categories: data, formData: new FormData()})
            }
        })
    }

    useEffect(() => {
       init(match.params.productId);

    }, [])

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({...values, [name]: value})
    }

    const clickSubmit = (e) => {
    e.preventDefault()
    setValues({...values, error: '', loading: true})
    updateProduct(match.params.productId, user._id, token, formData)
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

    // const redirectUser = () => {
    //     if(redirectToProfile) {
    //         if(!error) {
    //             return navigate('/')
    //         }
    //     }
    // }

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
            <button className="btn btn-outline-primary" type="submit">Update Product</button>
             </div>
            
        </form>
        <div className="mt-5">
        <Link to='/admin/dashboard' className="text-warning">Back to Dashboard</Link>
         {redirectToProfile ? (!error ?  navigate('/') : '') : ''}
        </div>
        </div>
        </div>
        </Layout>
    )
}
export default UpdateProduct;