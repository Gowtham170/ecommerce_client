import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';

import Message from '../../../components/message/Message';
import { useGetOrdersQuery } from '../../../redux/slices/api/orderApiSlice';
import Button from '../../../components/button/Button';
import './OrderListScreen.scss';

const OrderListScreen = () => {

  const { data: orders, isLoading, error } = useGetOrdersQuery();

  const columns = [
    { name: 'ID', selector: row => row.id },
    { name: 'USER', selector: row => row.user },
    { name: 'DATE', selector: row => row.date },
    { name: 'TOTAL', selector: row => row.total },
    { name: 'PAID', selector: row => row.paid },
    { name: 'DELIVERED', selector: row => row.delivered },
    { name: 'DETAILS', selector: row => row.details }
  ]

  const data = orders?.map((order) => ({
    id: order._id,
    user: order.user && order.user.name,
    date: order.createdAt.substring(0, 10),
    total: order.totalPrice,
    paid: (order.isPaid
      ? (order.paidAt.substring(0, 10))
      : (
        <FaTimes style={{ color: 'red' }}></FaTimes>
      )),
    delivered: (order.isDelivered
      ? (order.deliveredAt.substring(0, 10))
      : (
        <FaTimes style={{ color: 'red' }}></FaTimes>
      )),
    details: (<Link to={`/order/${order._id}`}><Button children={'details'} className={'btn details-btn'}></Button></Link>)
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
      <h1 className='order-title'>Orders</h1>
      {isLoading ? (
        <div>loading...</div>
      ) : error ? (
        <Message children={error} className='message' />
      ) : (
        <div>
          {/* <div className='text-end'><input type='text'/></div> */}
          <DataTable
            columns={columns}
            data={data}
            progressPending={isLoading}
            fixedHeader
            pagination
            highlightOnHover
            striped
            responsive
            customStyles={customStyles}/>
        </div>
      )}
    </div>
  )
}

export default OrderListScreen;