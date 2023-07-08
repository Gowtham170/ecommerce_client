import React from 'react'

const Form = ({ className, onSubmit, }) => {
    return (
        // <FormControl>
        //     <InputLabel htmlFor="my-input">Email address</InputLabel>
        //     <Input id="my-input" aria-describedby="my-helper-text" />
        //     <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
        // </FormControl>
         <form className='login-form' onSubmit={onSubmitHandler}>
         <div className='form-title btn'>Login</div>
         <div className='form-group'>
             <label htmlFor='email'
                 className='form-label'>
                 Email
             </label>
             <input id='email'
                 name='email'
                 placeholder='eg: example@gmail.com'
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
                 placeholder='eg: john@123'
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
                 ? `/register?redirect=${redirect}` 
                 : '/register'}>
                 Register
             </Link>
         </div>
     </form>
    );
}

export default Form;