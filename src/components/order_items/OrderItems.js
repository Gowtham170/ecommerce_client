import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Message from '../message/Message';
import './OrderItems.scss';

const OrderItems = ({ items }) => {
    return (
        <>
            {(items.length !== 0) ? (
                <div className='order-items-wrapper'>
                    <h2>Order Items</h2>
                    <div className='order-item'>
                        {items.map((item) => (
                            <Fragment key={item.name}>
                                <img src={item.image} className='item-image' alt={item.name}/>
                                <Link to={`/product/${item._id}`} className='item-name'>{item.name}</Link>
                                <span className='item-price'>{item.qty} x ${item.price} = ${item.qty * item.price}</span>
                            </Fragment>
                        ))}
                    </div>
                </div>
            ) : (
                <Message children={`Your cart is empty`} className='order-empty-message'/>
            )}
        </>
    );
}

export default OrderItems;