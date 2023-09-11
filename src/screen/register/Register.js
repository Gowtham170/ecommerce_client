import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import Button from '../../components/button/Button';
import { useRegisterMutation } from '../../redux/slices/api/userApiSlice';
import { setCredentials } from '../../redux/slices/authSlice';
import './Register.scss';

const Register = () => {

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formValues = [
    { label: 'Name', name: 'name', type: 'text', value: `${values.name}`, placeholder: 'eg: john' },
    { label: 'Email', name: 'email', type: 'email', value: `${values.email}`, placeholder: 'eg: example@gmail.com' },
    { label: 'Password', name: 'password', type: 'password', value: `${values.password}`, placeholder: 'eg: john@123' },
    { label: 'Confirm Password', name: 'confirmPassword', type: 'password', value: `${values.confirmPassword}`, placeholder: 'eg: john@123' }
  ]

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/';

  /* checking for the login info if it exists then redirect to the home page */
  useEffect(() => {
    if (userInfo) {
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
    if (values.password !== values.confirmPassword) {
      toast.error('Password do not match');
    } else {
      try {
        const res = await register({ ...values }).unwrap();
        dispatch(setCredentials({ ...res, }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
        console.log(err);
      }
    }
  }

  return (
    <div className='register-container form-container'>
      <form className='login-form' onSubmit={onSubmitHandler}>
      <div className='form-title btn'>Sign Up</div>
      <div className='register-wrapper'>
        {formValues.map((fv) => (
          <div className='form-group' key={fv.name}>
            <label htmlFor={fv.name}
              className='form-label'>
              {fv.label}
            </label>
            <input id={fv.name}
              name={fv.name}
              placeholder={fv.placeholder}
              className='form-control'
              type={fv.type}
              value={fv.value}
              onChange={onChangeHandler} />
          </div>
        ))}
        </div>
        <Button children='Login'
          type='submit'
          className='btn action-btn'
          disabled={isLoading} />
        {isLoading && <div>Loading...</div>}
        <div className='new-customer-link'>
          Already have a account ? <Link to={redirect
            ? `/login?redirect=${redirect}`
            : '/login'}>
            Login
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Register;