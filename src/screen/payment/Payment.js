import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "../../components/button/Button";
import CheckoutSteps from "../../components/checkout_steps/CheckoutSteps";
import { savePaymentMethod } from "../../redux/slices/cartSlice";
import './Payment.scss';

const Payment = () => {

    const [paymentMethod, setPaymentMthod] = useState('PayPal');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    useEffect(() => {
        if(!shippingAddress) {
            navigate('/shipping')
        }
    }, [shippingAddress, navigate]);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    }

    return (
        <>
            <CheckoutSteps step1 step2 step3 />
            <div className='payment-container'>
                <form className='payment-form' onSubmit={onSubmitHandler}>
                    <div className='form-title btn'>Payment Method</div>
                    <label className="select-method">
                            Select Method
                    </label>
                    <div className='form-group'>
                        <input id='payment-method'
                            name='payment-method'
                            className='form-control btn'
                            type='radio'
                            checked
                        />
                        <label htmlFor='payment-method'
                            className="payment-method-label btn">
                                PayPal or Credit Card
                        </label>
                    </div>
                    <Button children='continue'
                        type='submit'
                        className='btn action-btn'
                        disabled={''} />
                </form>
            </div>
        </>
    );
}

export default Payment;