import { apiSlice } from "./apiSlice";

const PRODUCTS_URL = process.env.REACT_APP_PRODUCTS_URL;
const UPLOAD_URL = process.env.REACT_APP_UPLOAD_URL;

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({keyword}) => ({
                url: PRODUCTS_URL,
                params: {
                    keyword
                }
            }),
            providesTags: ['Product'],
            keepUnusedDataFor: 5
        }),
        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`
            }),
            keepUnusedDataFor: 5
        }),
        createProduct: builder.mutation({
            query: () => ({
                url: PRODUCTS_URL,
                method: 'POST'
            }),
            invalidatesTags: ['Product']
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Product']
        }),
        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: UPLOAD_URL,
                method: 'POST',
                body: data,
            }),
        }),
        deleteProdut: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: 'DELETE'
            })
        }),
        createReview: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}/reviews`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Product']
        }),
        getTopProducts: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/top`,
            }),
            keepUnusedDataFor: 5,
        })
    })
});

export const { 
    useGetProductsQuery, 
    useGetProductDetailsQuery, 
    useCreateProductMutation,
    useUpdateProductMutation,
    useUploadProductImageMutation,
    useDeleteProdutMutation,
    useCreateReviewMutation,
    useGetTopProductsQuery
} = productsApiSlice;