import './Form.scss';
import { Link } from 'react-router-dom';
import Button from '../button/Button';

const Form = ({ className, title, formLabel, values, onChange, onSubmit, children, disabled, redirect }) => {

    return (
        <form className={className} onSubmit={onSubmit}>
            <div className='form-title btn'>{title}</div>
            {formLabel.map((fl) => (
                <div className='form-group' key={fl}>
                    <label htmlFor={fl}
                        className='form-label'>
                        {fl}
                    </label>
                    <input id={fl}
                        name={fl}
                        placeholder='eg: example@gmail.com'
                        className='form-control'
                        type={(fl === 'Email' && 'email') || (fl === 'Password' && 'Password')}
                        value={values.email}
                        onChange={onChange} />
                </div>
            ))}
            <Button children={children}
                type='submit'
                className='btn action-btn'
                disabled={disabled}></Button>
            {disabled && <div>Loading...</div>}
            <div className='new-customer-link'>
                New customer ? <Link to={redirect
                    ? `/register?redirect=${redirect}`
                    : '/register'}>
                    Register
                </Link>
            </div>
        </form>
    );
}

export default Form;