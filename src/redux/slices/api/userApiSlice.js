import { apiSlice } from "./apiSlice";

const USERS_URL = process.env.REACT_APP_USERS_URL;

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data
            }),
        }),
    })
});

export const { useLoginMutation } = userApiSlice;