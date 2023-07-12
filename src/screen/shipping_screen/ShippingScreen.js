import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/button/Button';
import CheckoutSteps from '../../components/checkout_steps/CheckoutSteps';
import { saveShippingAddress } from '../../redux/slices/cartSlice';
import './ShippingScreen.scss';

const ShippingScreen = () => {

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    
    const [values, setValues] = useState({
        address: shippingAddress?.address || '',
        city: shippingAddress?.city || '',
        postalCode: shippingAddress?.postalCode || '',
        country: shippingAddress?.country || ''
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formValues = [
        { label: 'Address', name: 'address', type: 'text', pattern: "^[a-zA-Z]*$", value: `${values.address}` },
        { label: 'City', name: 'city', type: 'text', pattern: "^[a-zA-Z]*$", value: `${values.city}` },
        { label: 'Postal Code', name: 'postalCode', type: 'text', pattern: "[0-9]*", value: `${values.postalCode}` },
        { label: 'Country', name: 'country', type: 'text', pattern: "^[a-zA-Z]*$", value: `${values.country}` }
    ]

    const onChangeHandler = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ ...values, }));
        navigate('/payment');
    }

    return (
        <>
            <CheckoutSteps step1 step2/>
            <div className='form-container'>
                <form className='shipping-from' onSubmit={onSubmitHandler}>
                    <div className='form-title btn'>Shipping</div>
                    {formValues.map((fv) => (
                        <div className='form-group' key={`${fv.name}`}>
                            <label htmlFor={`${fv.name}`}
                                className='form-label'>
                                {`${fv.label}`}
                            </label>
                            <input id={`${fv.name}`}
                                name={`${fv.name}`}
                                className='form-control'
                                type={`${fv.type}`}
                                pattern={`${fv.pattern}`}
                                value={`${fv.value}`}
                                onChange={onChangeHandler} />
                        </div>
                    ))}
                    <Button children='continue'
                        type='submit'
                        className='btn action-btn'
                        disabled={''} />
                    {/* {isLoading && <div>Loading...</div>} */}
                </form>
            </div>
        </>
    );
}

export default ShippingScreen;


{/* <div className='form-group'>
                    <label htmlFor='email'
                        className='form-label'>
                        Address
                    </label>
                    <input id='email'
                        name='email'
                        className='form-control'
                        type='text'
                        value={''}
                        onChange={''} />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'
                        className='form-label'>
                        City
                    </label>
                    <input id='password'
                        name='password'
                        className='form-control'
                        type='password'
                        value={''}
                        onChange={''} />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'
                        className='form-label'>
                        Postal Code
                    </label>
                    <input id='password'
                        name='password'
                        className='form-control'
                        type='number'
                        value={''}
                        onChange={''} />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'
                        className='form-label'>
                        Country
                    </label>
                    <input id='password'
                        name='password'
                        className='form-control'
                        type='password'
                        value={''}
                        onChange={''} />
                </div> */}