import './PaymentMethod.scss';

const PaymentMethod = ({ paymentMethod }) => {
    return (
        <div className='payment-method-wrapper'>
            <h2>Payment Method</h2>
            <div className='payment-method'>
                <span>Method: </span>
                {paymentMethod}
            </div>
        </div>
    );
}

export default PaymentMethod;