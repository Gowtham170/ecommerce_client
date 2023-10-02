import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import {
    useGetOrderDetailsQuery,
    usePayOrderMutation,
    useGetPayPalClientIdQuery,
    useDeliverOrderMutation
} from '../../redux/slices/api/orderApiSlice';
import Shipping from '../../components/shipping/Shipping';
import PaymentMethod from '../../components/payment_method/PaymentMethod';
import OrderItems from '../../components/order_items/OrderItems';
import OrderSummary from '../../components/order_summary/OrderSummary';
import Message from '../../components/message/Message';
import './OrderScreen.scss';

const OrderScreen = () => {

    const { id: orderId } = useParams();

    const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);

    const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

    const [deliverOrder] = useDeliverOrderMutation();

    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

    const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPayPalClientIdQuery();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!errorPayPal && !loadingPayPal && paypal.clientId) {
            const loadPayPalScript = async () => {
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                        'client-id': paypal.clientId,
                        currency: 'USD'
                    }
                });
                paypalDispatch({
                    type: 'setLoadingStatus',
                    value: 'pending'
                })
            }
            if (order && !order.isPaid) {
                if (!window.paypal) {
                    loadPayPalScript();
                }
            }
        }
    }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

    function onApprove(data, actions) {
        return actions.order.capture().then(async function (details) {
            try {
                await payOrder({ orderId, details });
                refetch();
                toast.success('Payment successful');
            } catch (err) {
                toast.error(err?.data?.message || err.message);
            }
        });
    }
    function onError(err) {
        toast.error(err.message);
    }
    function createOrder(data, actions) {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: order.totalPrice,
                    }
                }
            ],
        }).then((orderId) => {
            return orderId;
        });
    }

    const deliverOrderHandler = async () => {
        try {
            await deliverOrder(orderId);
            refetch();
            toast.success('Order delivered');
        } catch (err) {
            toast.error(err?.data?.message || err.message);
        }
    }

    return isLoading ? (<div>loading...</div>)
        : error ? (
            <div style={{ color: 'red' }}></div>
        )
            : (
                <>
                    <div className='d-grid place-order-container'>
                        <div className='product-summary'>
                            <h2 className='order_id'> Order {order._id}</h2>
                            <div className='product-summary-wrapper'>
                                <Shipping shippingAddress={order.shippingAddress}
                                    user={order.user} />
                                {order.isDelivered ? (
                                    // <div>Delivered on {order.deliveredAt}</div>
                                    <Message children={`Delivered on ${order.deliveredAt}`} className='delivery-message success' />
                                ) : (
                                    <Message children={'Not Delivered'} className='delivery-message' />
                                )}
                                <hr />
                                <PaymentMethod paymentMethod={order.paymentMethod} />
                                {order.isPaid ? (
                                    // <div>Delivered on {order.deliveredAt}</div>
                                    <Message children={`Paid on ${order.paidAt}`} className='delivery-message success' />
                                ) : (
                                    <Message children={'Not Paid'} className='delivery-message' />
                                )}
                                <hr />
                                <OrderItems items={order.orderItems} />
                            </div>
                        </div>
                        <div className='order-summary-wrapper'>
                            <OrderSummary itemsPrice={order.itemsPrice}
                                taxPrice={order.taxPrice}
                                totalPrice={order.totalPrice}
                                isPaid={order.isPaid}
                                isDelivered={order.isDelivered}
                                loadingPay={loadingPay}
                                isPending={isPending}
                                isLoading={isLoading}
                                onApprove={onApprove}
                                onError={onError}
                                createOrder={createOrder}
                                userInfo={userInfo}
                                deliverOrderHandler={deliverOrderHandler} />
                        </div>
                    </div>
                </>
            )
}

export default OrderScreen;

// payOrder={payOrder}
// orderId={orderId}
// refetch={refetch} 