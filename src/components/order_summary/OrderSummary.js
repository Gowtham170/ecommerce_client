import { PayPalButtons } from '@paypal/react-paypal-js';

import Button from '../../components/button/Button';
import './OrderSummary.scss';

const OrderSummary = ({
    itemsPrice,
    taxPrice,
    totalPrice,
    length,
    onClick,
    isPaid,
    isDelivered,
    loadingPay,
    isPending,
    isLoading,
    onApprove,
    onError,
    createOrder,
    userInfo,
    deliverOrderHandler
}) => {



    return (
        <div className='order-summary'>
            <h2 className='order-summary-title'>Order Summary</h2>
            <hr style={{ marginBlock: '1rem' }} />
            <div className='table-col'>
                <span style={{ paddingRight: '1.6rem', paddingLeft: '1rem' }}>Items</span>
                <span className='table-value'>${itemsPrice}</span>
                <hr style={{ marginBlock: '1rem' }} />
            </div>
            <div className='table-col'>
                <span style={{ paddingRight: '3.5rem', paddingLeft: '1rem' }}>Tax</span>
                <span className='table-value'>${taxPrice}</span>
                <hr style={{ marginBlock: '1rem' }} />
            </div>
            <div className='table-col'>
                <span style={{ paddingRight: '2rem', paddingLeft: '1rem' }}>Total</span>
                <span className='table-value'>${totalPrice}</span>
                {!isPaid && <hr style={{ marginBlock: '1rem' }} />}
            </div>
            {onClick ? (
                <>
                    <Button children='Place Order'
                        type='button'
                        className='btn place-order-btn'
                        disabled={length === 0}
                        onClick={onClick} />
                    {isLoading && <div>Loading...</div>}
                </>
            ) : (!isPaid ? (
                <>
                    {loadingPay && (<div>Loading...</div>)}
                    {isPending ? (<div>Loading...</div>)
                        : (
                            <PayPalButtons
                                className='paypal-button'
                                createOrder={createOrder}
                                onApprove={onApprove}
                                onError={onError}></PayPalButtons>
                        )
                    }
                </>
            ) : (
                userInfo &&
                userInfo.isAdmin &&
                isPaid &&
                !isDelivered &&
                deliverOrderHandler && (
                    <>
                        <Button children='Mark As Delivered'
                            type='button'
                            className='btn place-order-btn'
                            onClick={deliverOrderHandler} />
                        {isLoading && <div>Loading...</div>}
                    </>
                )
            )
            )}
        </div>
    );
}

export default OrderSummary;