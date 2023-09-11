import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

import CheckoutSteps from '../../components/checkout_steps/CheckoutSteps';
import { useCreateOrderMutation } from '../../redux/slices/api/orderApiSlice';
import { clearCartItems } from '../../redux/slices/cartSlice';
import Shipping from '../../components/shipping/Shipping';
import PaymentMethod from '../../components/payment_method/PaymentMethod';
import OrderItems from '../../components/order_items/OrderItems';
import OrderSummary from '../../components/order_summary/OrderSummary';
import './PlaceOrder.scss';

const PlaceOrder = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const [createOrder, { isLoading, error }] = useCreateOrderMutation();

    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate('/shipping');
        } else if (!cart.paymentMethod) {
            navigate('/payment')
        }
    }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

    const placeOrderHandler = async () => {
        try {
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice
            }).unwrap();
            dispatch(clearCartItems());
            navigate(`/order/${res._id}`)
        } catch (err) {
            toast.error(error);
        }
    }
 
    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <div className='d-grid place-order-container'>
                <div className='product-summary'>
                    <div className='product-summary-wrapper'>
                        <Shipping shippingAddress={cart.shippingAddress}/>
                        <hr style={{ width: '93%' }} />
                        <PaymentMethod paymentMethod={cart.paymentMethod}/>
                        <hr style={{ width: '93%' }} />
                        <OrderItems items={cart.cartItems}/>
                    </div>
                </div>
                <OrderSummary itemsPrice={cart.itemsPrice} 
                        taxPrice={cart.taxPrice}
                        totalPrice={cart.totalPrice}
                        length={cart.cartItems.length}
                        onClick={placeOrderHandler} 
                        isLoading={isLoading}/>
            </div>
        </>
    );
}

export default PlaceOrder;


