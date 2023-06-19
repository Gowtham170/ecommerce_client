import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import './Login.scss';

import { loginSchema } from '../../validation/schema';

const initialValues = {
    email: '',
    password: ''
}

const Login = () => {

    // const login = useFormik({
    //     initialValues,
    //     validationSchema: loginSchema,

    // });

    const [values, setValues] = useState({initialValues});

    const onChangeHandler = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }

    const onSubmitHandler = () => {

    }

    return (
        <div className='form-container'>
            <form className='login-form' onSubmit={onSubmitHandler}>
                <div className='form-title btn'>Login</div>
                <div className='form-group'>
                    <label htmlFor='email'
                        className='form-label'>
                        Email
                    </label>
                    <input id='email'
                        name='email'
                        className='form-control'
                        type='email'
                        value={values.email}
                        onChange={onChangeHandler} />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'
                        className='form-label'>
                        Password
                    </label>
                    <input id='password'
                        name='password'
                        className='form-control'
                        type='password'
                        value={values.password}
                        onChange={onChangeHandler} />
                </div>
                <button className='btn action-btn'>Sign in</button>
                <div className='new-customer-link'>
                    New customer ? <Link to='/cart'>Register</Link>
                </div>
            </form>
        </div>
    );
}

export default Login