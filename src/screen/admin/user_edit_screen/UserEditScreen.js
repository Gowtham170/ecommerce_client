import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import {
    useGetUserDetailsQuery,
    useUpdateUserMutation
} from '../../../redux/slices/api/userApiSlice';
import Message from '../../../components/message/Message';
import Button from '../../../components/button/Button';
import './UserEditScreen.scss';

const UserEditScreen = () => {

    const { id: userId } = useParams();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const { data: user, isLoading, refetch, error } = useGetUserDetailsQuery(userId);

    const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

    const navigate = useNavigate();


    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [user]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await updateUser({
                userId,
                name,
                email,
                isAdmin,
            });
            if (res?.error) {
                toast.error(res?.error?.data?.message);
            } else {
                toast.success('User updated');
                refetch();
                navigate('/admin/userList');
            }
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }

    return (
        <>
            <div className='product-edit-screen'>
                <Link to='/admin/userlist' className='btn goback-btn'>Go Back</Link>
                <form className='shipping-from' onSubmit={onSubmitHandler}>
                    <div className='form-title btn'>Edit User</div>
                    {loadingUpdate && <div>Loading...</div>}
                    {isLoading
                        ? (<div>Loading...</div>)
                        : (error ? <Message children={error} className='message' />
                            : (<>
                                <div className='form-group'>
                                    <label htmlFor='name'
                                        className='form-label'>
                                        Name
                                    </label>
                                    <input id='name'
                                        name='name'
                                        className='form-control'
                                        type='text'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)} />
                                    <label htmlFor='email'
                                        className='form-label'>
                                        Name
                                    </label>
                                    <input id='email'
                                        name='email'
                                        className='form-control'
                                        type='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} />
                                    <label className='checkbox'>
                                        <input id='isAdmin'
                                            name='isAdmin'
                                            className='form-control'
                                            type='checkbox'
                                            checked={isAdmin}
                                            onChange={(e) => setIsAdmin(e.target.checked)} />
                                        <span>Is Admin</span>
                                    </label>
                                </div>
                                <Button children='update'
                                    type='submit'
                                    className='btn action-btn'
                                    disabled={''} />
                                {/* {isLoading && <div>Loading...</div>} */}
                            </>)
                        )}
                </form>
            </div>
        </>
    );
}

export default UserEditScreen;