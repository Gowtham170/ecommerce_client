import { createSlice } from "@reduxjs/toolkit";
import { isCompositeComponent } from "react-dom/test-utils";
import { json } from "react-router-dom";

const initialState = localStorage.getItem('cart') 
            ? JSON.parse(localStorage.getItem('cart'))
            : {cartItems:[]}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find(
                (current_item) => current_item._id === item.id
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
            state.taxPrice = Number(state.itemsPrice * 0.10).toFixed(2);

            // calculate totalprice
            state.totalPrice = Number(state.itemsPrice + state.taxPrice).toFixed(2);

            localStorage.setItem('cart', JSON.stringify(state));
        }
    }
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;