import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import DataTable from 'react-data-table-component';

import { 
  useGetUsersQuery,
  useDeleteUserMutation,
} from '../../../redux/slices/api/userApiSlice';
import Message from '../../../components/message/Message';
import Button from '../../../components/button/Button';
import './UserListScreen.scss';

const UserListScreen = () => {

  const { data: users, isLoading, error, refetch } = useGetUsersQuery();

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        const res = await deleteUser(id);
        if(!res?.error) {
          toast.success(res?.data?.message);
        }
        toast.error(res?.error?.data?.message)
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  }

  const columns = [
    { name: 'ID', selector: row => row.id },
    { name: 'NAME', selector: row => row.name },
    { name: 'EMAIL', selector: row => row.email },
    { name: 'ADMIN', selector: row => row.admin },
    { name: 'ACTIONS', selector: row => row.actions },
  ]

  const data = users?.map((user) => ({
    id: user._id,
    name: user.name,
    email: <a href={`mailto:${user.email}`}>{user.email}</a>,
    admin: (user.isAdmin ? (
      <FaCheck style={{ color: 'green' }} />
    ) : (
      <FaTimes style={{ color: 'red' }} />
    )),
    actions: (
      <>
        <Link to={`/admin/user/${user._id}/edit`}>
          <FaEdit />
        </Link> | <FaTrash style={{ color: 'red' }} className='btn' onClick={() => deleteHandler(user._id)} />
      </>
    ),
  }))

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#252830",
        color: "white"
      }
    }
  }

  return (
    <div className='order-list-screen-container'>
      <h1 className='order-title'>Users</h1>
      {loadingDelete && <div>loading...</div>}
      {isLoading ? (
        <div>loading...</div>
      ) : error ? (
        <Message children={error} className='message' />
      ) : (
        <div>
          <div className='text-end'><input type='text' /></div>
          <DataTable
            columns={columns}
            data={data}
            progressPending={isLoading}
            fixedHeader
            pagination
            highlightOnHover
            striped
            dense
            responsive
            customStyles={customStyles} />
        </div>
      )}
    </div>
  )
}

export default UserListScreen;