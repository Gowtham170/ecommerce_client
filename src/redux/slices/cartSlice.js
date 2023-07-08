import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem('cart') 
        ? JSON.parse(localStorage.getItem('cart'))
        : {cartItems:[], shippingAddress: {}, paymentMethod: 'PayPal'}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find(
                (current_item) => current_item._id === item._id
            );
        
            if(existItem) {
                state.cartItems = 
                    state.cartItems.map(
                        (current_item) => current_item._id === existItem._id ? item : current_item
                    ); 
            } else {
                state.cartItems = [...state.cartItems, item];
            }

            // calculate item price
            state.itemsPrice = state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

            // calculate tax price (10%)
            state.taxPrice = Number((0.10 * state.itemsPrice).toFixed(2));
        
            // calculate totalprice
            state.totalPrice = Number(((state.itemsPrice) + (state.taxPrice))).toFixed(2);

            localStorage.setItem('cart', JSON.stringify(state));
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((current_item) => current_item._id !== action.payload);
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
        }
    }
});

export const { addToCart, removeFromCart, saveShippingAddress } = cartSlice.actions;

export default cartSlice.reducer;