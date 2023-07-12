import { Link } from 'react-router-dom';

import './CheckoutSteps.scss';

const CheckoutSteps = ({ step1, step2, step3, step4, step5 }) => {
    return (
        <nav className='checkout-step-navbar'>
            <ul className='checkpout-step-nav'>
                {step1 ? (
                        <Link className='btn nav-link' to='/login'>
                            Sign In
                        </Link>
                    )
                    : (
                        <li className='btn checkout-step-nav-link-disable'>
                            Sign In
                        </li>
                )}
                 {step2 ? (
                        <Link className='btn nav-link' to='/shipping'>
                            Shipping
                        </Link>
                    )
                    : (
                        <li className='btn checkout-step-nav-link-disable'>
                            Shipping
                        </li>
                )}
                 {step3 ? (
                        <Link className='btn nav-link' to='/payment'>
                            Payment
                        </Link>
                    )
                    : (
                        <li className='btn checkout-step-nav-link-disable'>
                            Payment
                        </li>
                )}
                 {step4 ? (
                        <Link className='btn nav-link' to='/placeorder'>
                            Place Order
                        </Link>
                    )
                    : (
                        <li className='btn checkout-step-nav-link-disable'>
                            Place Order
                        </li>
                )}
            </ul>
        </nav>
    );
}

export default CheckoutSteps;
