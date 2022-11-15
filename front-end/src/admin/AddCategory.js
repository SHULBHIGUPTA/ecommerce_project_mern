import React, {useState} from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import {Link} from 'react-router-dom';
import { createCategory } from './apiAdmin';

const AddCategory = () => {
    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [errordisplay, seterrorDisplay] = useState('')

    //destructure user and token from localstorage

    const {user, token} = isAuthenticated();

    const handleChange = e => {
    setError('')
    setName(e.target.value)
    }

    const clickSubmit = e => {
    e.preventDefault();
    setError('');
    setSuccess(false)
    createCategory(user._id, token, {name})
    .then(data => {
        if(data.error) {
            setError(true)
            seterrorDisplay(data.error)
        }
        else {
            setError("")
            setSuccess(true)
        }
    })
    }
    return (
        <Layout title="Add a new category" description={`G'day ${user.name}, ready to add a new category`}>
        <div className='row'>
        <div className="col-md-8 offset-md-2">
        {success && <h3 className="text-success">{name} is created</h3>}
        {error && <h3 className="text-danger">{errordisplay}</h3>}
        <form onSubmit={clickSubmit}>
            <div className="form-group">
            <label className="text-muted">Name</label>
            <input type="text" className="form-control" value={name} 
            autoFocus
            required
            onChange={handleChange}/>
            </div>
            <button className="btn btn-outline-primary mt-2">Create Category</button>
            
        </form>
        <div className="mt-5">
        <Link to='/admin/dashboard' className="text-warning">Back to Dashboard</Link>
        </div>
        </div>
        </div>
        </Layout>
    )
}

export default AddCategory