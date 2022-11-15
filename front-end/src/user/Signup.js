import React, {useState} from 'react';
import Layout from '../core/Layout';
// import { API } from '../config';
import {Link} from 'react-router-dom';
import {signup} from '../auth';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false
  })

  const {name, email, password, success, error} = values

  const handleChange = name => event => {
  setValues({...values, error: false, [name] : event.target.value})
  }

 

  const clickSubmit = (e) => {
    e.preventDefault()
    setValues({...values, error: false})
    signup({name, email, password})
    .then(data => {
      if(data.error) {
        setValues({...values, error: data.error, success: false})
      }else {
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          error: '',
          success: true
        })
      }
    })
  }


 
  return (
    <Layout title="signup" description='Node React E-commerce App' className="container col-md-8 offset-md-2">
     <div className='alert alert-info' style={{display: success ? '' : 'none'}}>
     new acccount is created. please <Link to="/signin">Signin</Link></div>
     <div className='alert alert-danger' style={{display: error ? '' : 'none'}}>{error}</div>
     <form >
    <div className='form-group'>
    <label className="text-muted">Name</label>
    <input value={name} onChange={handleChange('name')} type="text" className='form-control'/>
    </div>
    <div className='form-group'>
    <label className="text-muted">Email</label>
    <input value={email} onChange={handleChange('email')} type="email" className='form-control'/>
    </div>
    <div className='form-group'>
    <label className="text-muted">Password</label>
    <input value={password} onChange={handleChange('password')} type="password" className='form-control'/>
    </div>
    <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
    </form>
    </Layout>
  )
}

export default Signup



