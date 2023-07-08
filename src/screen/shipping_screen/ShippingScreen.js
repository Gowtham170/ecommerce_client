import { useState } from 'react';
import './ShippingScreen.scss';

const ShippingScreen = () => {
  
  const [values, setValues] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: ''
  })

  return (
    <div className='shipping-screen-container'>
        <form className='shipping-from'></form>
    </div>
  );
}

export default ShippingScreen;