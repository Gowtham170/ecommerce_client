import './Shipping.scss';

const Shipping = ({ shippingAddress, user }) => {
    return (
        <div className='shipping-wrapper'>
            <h2>Shipping</h2>
            {user && (
                <>
                    <div className='name'>
                        <span>Name: </span>
                        {user.name}
                    </div>
                    <div className='email'>
                        <span>Email: </span>
                        {user.email}
                    </div>
                </>
            )}
            <div className='address'>
                <span>Address: </span>
                {`${shippingAddress.address}, 
                  ${shippingAddress.city} 
                  ${shippingAddress.postalCode}, 
                  ${shippingAddress.country}`
                }
            </div>

        </div>
    );
}

export default Shipping;