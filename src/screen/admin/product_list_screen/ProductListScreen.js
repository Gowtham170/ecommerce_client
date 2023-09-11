import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import DataTable from 'react-data-table-component';

import Button from '../../../components/button/Button';
import Message from '../../../components/message/Message';
import { 
    useGetProductsQuery, 
    useCreateProductMutation,
    useDeleteProdutMutation
} from '../../../redux/slices/api/productsApiSlice';
import './ProductListScreen.scss';


const ProductListScreen = () => {

    const { data: products, isLoading, error, refetch } = useGetProductsQuery();

    const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();

    const [deleteProdut, { isLoading: loadingDelete }] = useDeleteProdutMutation();

    const deleteHandler = async (id) => {
        if(window.confirm('Are you sure?')) {
            try {
                await deleteProdut(id);
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    }


    const columns = [
        { name: 'ID', selector: row => row.id },
        { name: 'NAME', selector: row => row.name },
        { name: 'PRICE', selector: row => row.price },
        { name: 'CATEGORY', selector: row => row.category },
        { name: 'BRAND', selector: row => row.brand },
        { name: 'ACTIONS', selector: row => row.actions },
        // { name: 'EDIT', selector: row => row.edit },
        // { name: 'DELETE', selector: row => row.delete }
    ]

    const data = products?.map((product) => ({
        id: product._id,
        name: product.name,
        price: product.price,
        category: product.category,
        brand: product.brand,
        actions: (
            <>
                <Link to={`/admin/product/${product._id}/edit`}>
                    <FaEdit />
                </Link> | <FaTrash style={{ color: 'red' }} onClick={() => deleteHandler(product._id)} />
            </>
        ),
        // edit: (<Link to={`/admin/product/${product._id}`}><FaEdit/></Link>),
        // delete: (<Link to={`/admin/product/${product._id}`}><FaTrash style={{ color: 'red' }}/></Link>)
    }))

    const customStyles = {
        headCells: {
            style: {
                backgroundColor: "#252830",
                color: "white"
            }
        }
    }

    const createProductHandler = async () => {
        if (window.confirm('Are you sure you want to create a new product?')) {
            try {
                await createProduct();
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    }

    return (
        <>
            <div className='create-product-wrapper'>
                <h1>Products</h1>
                <Button children='create product'
                    type='button'
                    className='btn create-product-btn'
                    onClick={createProductHandler}
                />
                {loadingCreate && <div>loading...</div>}
                {loadingDelete && <div>loading...</div>}
            </div>
            <div className='order-list-screen-container'>
                {/* <h1 className='order-title'>Orders</h1> */}
                {error ? (
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
                            pointerOnHover
                            striped
                            responsive
                            customStyles={customStyles}
                            className='text-hover' />
                    </div>
                )}
            </div>
        </>
    );
}

export default ProductListScreen;