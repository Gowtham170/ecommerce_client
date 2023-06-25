import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import './Login.scss';

import { useLoginMutation } from '../../redux/slices/api/userApiSlice';
import { setCredentials } from '../../redux/slices/authSlice';

const Login = () => {

    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const  [login, {isLoading}] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const redirect = searchParams.get('redirect') || '/';


    /* checking for the login info if it exists 
      then redirect to the home page */ 
    useEffect(() => {
        if(userInfo) {
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate]);

    const onChangeHandler = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const res =  await login({email: values.email, password: values.password }).unwrap();
            console.log(res);
            dispatch(setCredentials({...res, }));
            navigate(redirect);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
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
                <button className='btn action-btn' 
                    type='submit'
                    disabled={isLoading}>
                    Sign in
                </button>
                {isLoading && <div>Loading...</div>}
                <div className='new-customer-link'>
                    New customer ? <Link to={redirect 
                        ? `/cart?redirect=${redirect}` 
                        : '/cart'}>
                        Register
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Login;