import { apiSlice } from "./apiSlice";

const ORDERS_URL = process.env.REACT_APP_ORDERS_URL;

export const orderAPiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: 'POST',
                body: {...order}
            })
        }),
    })
});

export const { useCreateOrderMutation } = orderAPiSlice;