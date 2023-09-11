import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { 
    useUpdateProductMutation, 
    useGetProductDetailsQuery,
    useUploadProductImageMutation
} from '../../../redux/slices/api/productsApiSlice';
import Message from '../../../components/message/Message';
import Button from '../../../components/button/Button';
import './ProductEditScreen.scss';

const ProductEditScreen = () => {

    const { id: productId } = useParams();

    // const [name, setName] = useState('');
    // const [price, setPrice] = useState(0);
    // const [image, setImage] = useState('');
    // const [brand, setBrand] = useState('');
    // const [category, setCategory] = useState('');
    // const [countInStock, setCountInStock] = useState(0);
    // const [description, setDescription] = useState('');

    const [values, setValues] = useState({
        name: '',
        price: 0,
        image: '',
        brand: '',
        category: '',
        countInStock: 0,
        description: ''
    });

    const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);

    const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();

    const [uploadProductImage, { isLoading: loadingUpl }] = useUploadProductImageMutation();

    const navigate = useNavigate();

    const formValues = [
        { label: 'Name', name: 'name', type: 'text', value: `${values.name}` },
        { label: 'Price', name: 'price', type: 'Number', value: `${values.price}` },
        { label: 'Image', name: 'image', type: 'text', pattern: "[0-9]*", value: `${values.image}` },
        { label: 'Brand', name: 'brand', type: 'text', value: `${values.brand}` },
        { label: 'Count In Stock', name: 'countInStock', type: 'Number', value: `${values.countInStock}` },
        { label: 'Category', name: 'category', type: 'text', value: `${values.category}` },
        { label: 'Description', name: 'description', type: 'text', value: `${values.description}` }

        // { label: 'Name', name: 'name', type: 'text', pattern: "^[a-zA-Z]*$", value: `${values.name}` },
        // { label: 'Price', name: 'price', type: 'Number', pattern: "[0-9]*", value: `${values.price}` },
        // // { label: 'Image', name: 'postalCode', type: 'text', pattern: "[0-9]*", value: `${values.postalCode}` },
        // { label: 'Brand', name: 'brand', type: 'text', pattern: "^[a-zA-Z]*$", value: `${values.brand}` },
        // { label: 'Count In Stock', name: 'countInStock', type: 'text', pattern: "[0-9]*", value: `${values.countInStock}` },
        // { label: 'Category', name: 'category', type: 'text', pattern: "^[a-zA-Z]*$", value: `${values.category}` },
        // { label: 'Description', name: 'description', type: 'text', pattern: "^[a-zA-Z]*$", value: `${values.description}` }
    ]

    useEffect(() => {
        if (product) {
            // setName(product.name);
            // setPrice(product.price);
            // setImage(product.image);
            // setBrand(product.brand);
            // setCategory(product.category);
            // setCountInStock(product.countInStock);
            // setDescription(product.description);
            setValues({
                ...values,
                ...product
            })
        }
    }, [product]);

    const onChangeHandler = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const updatedProduct = {
                productId,
                ...values
            }
    
            const res = await updateProduct(updatedProduct);
            if (res?.error) {
                toast.error(res?.error?.data?.message);
            } else {
                toast.success('Product updated');
                refetch();
                navigate('/admin/productlist');
            }
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }

    }

    // console.log('hello'.substring)
    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success(res.message);
            setValues({
                ...values,
                image: res.image
            });
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }

    return (
        <>
            <div className='form-container product-edit-screen'>
                <Link to='/admin/productlist' className='btn goback-btn'>Go Back</Link>
                {/* <Button children='Go Back'
                    type='submit'
                    className='btn action-btn'
                    disabled={''} /> */}
                <form className='shipping-from' onSubmit={onSubmitHandler}>
                    <div className='form-title btn'>Edit Product</div>
                    {loadingUpdate && <div>Loading...</div>}
                    {isLoading
                        ? (<div>Loading...</div>)
                        : (error ? <Message children={error} className='message' />
                            : (<>
                                {formValues.map((fv) => (
                                    <div className='form-group' key={fv.name}>
                                        <label htmlFor={fv.name}
                                            className='form-label'>
                                            {fv.label}
                                        </label>
                                        <input id={fv.name}
                                            name={fv.name}
                                            className='form-control'
                                            type={fv.type}
                                            // pattern={`${fv.pattern}`}
                                            value={fv.label === 'Image' ? (fv.value.substring(47)) : fv.value}
                                            //value={`${fv.label === 'Image' && (fv.value.substring(47))}`}
                                            onChange={onChangeHandler} />
                                        { (fv.name === 'image') && (
                                            <input 
                                                type='file'
                                                label='choose file'
                                                onChange={uploadFileHandler}
                                                />
                                        )}
                                    </div>
                                ))}
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

export default ProductEditScreen;