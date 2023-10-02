import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../button/Button';
import './SearchBox.scss';

const SearchBox = () => {

    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if(keyword.trim()) {
            navigate(`/search/${keyword}`);
            setKeyword('');
        } else {
            navigate('/');
        }
    };

    return (
        <form className='search-box-form' onSubmit={onSubmitHandler}>
            <input
               className='text-control'
               type='text'
               value={keyword}
               onChange={(e) => setKeyword(e.target.value)}
               placeholder='Search Products...'
            />
            <Button children='Search'
                    type='submit'
                    className='btn search-btn'/>
        </form>
    );
}

export default SearchBox;
