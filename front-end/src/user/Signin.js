import React, {useState} from 'react';
import Layout from '../core/Layout';
import { useNavigate} from 'react-router-dom';
import {signin, authenticate, isAuthenticated} from '../auth';

const Signin = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    redirectToReferrer: false
  })
  const navigate = useNavigate()

  const {email, password, error, loading, redirectToReferrer} = values;
  const {user} = isAuthenticated()

  const handleChange = name => event => {
  setValues({...values, error: false, [name] : event.target.value})
  }

 

  const clickSubmit = (e) => {
    e.preventDefault()
    setValues({...values, error: false, loading: true})
    signin({email, password})
    .then(data => {
      if(data.error) {
        setValues({...values, error: data.error, loading: false})
      }else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true
          })
        })
       
      }
    })
  }

  const redirectUser = () => {
    if(redirectToReferrer) {
      if(user && user.role === 1) {
      return navigate('/admin/dashboard')
      } else {
        return navigate('/user/dashboard')
      }
    }
    // if(isAuthenticated()) {
    //   return navigate('/')
    // }
  }


  return (
    <Layout title="signin" description='signin Node React E-commerce App' className="container col-md-8 offset-md-2">
     {loading && (<div className='alert alert-info'>
     <h2>Loading...</h2>
     </div>) }
     
     <div className='alert alert-danger' style={{display: error ? '' : 'none'}}>{error}</div>    
     <form >
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
    {redirectUser()}
    </Layout>
  )
}

export default Signin



