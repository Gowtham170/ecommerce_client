import { apiSlice } from "./apiSlice";

const PRODUCTS_URL = process.env.REACT_APP_PRODUCTS_URL;

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: PRODUCTS_URL,
            }),
            keepUnusedDataFor: 5
        }),
        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`
            }),
            keepUnusedDataFor: 5
        })
    })
});

export const { useGetProductsQuery, useGetProductDetailsQuery } = productsApiSlice;