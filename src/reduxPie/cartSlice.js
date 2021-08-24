import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    addedIds: [],
    quantityById: {}
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const { _id } = action.payload;
            if (state.addedIds.includes(_id)) {
                state.quantityById[`${_id}`]++;
            } else {
                state.addedIds.push(_id);
                state.quantityById[`${_id}`] = 1;
            }
        },
        plusOne(state, action) {
            const { _id } = action.payload;
            state.quantityById[`${_id}`]++;
        },
        minusOne(state, action) {
            const { _id } = action.payload;
            if (state.quantityById[`${_id}`] === 1) {
                var qtyById = {};
                let tempCart = Object.entries(state.quantityById);
                for (var x = 0;x < tempCart.length;x += 2) {
                    let key = tempCart[x];
                    let value = tempCart[++x];
                    if (key !== _id) {
                        qtyById[`${key}`] = value;
                    }
                }
                state.quantityById = { ...qtyById };
            } else {
                state.quantityById[`${_id}`]--;
            }
        },
        removeAllFromCart(state, action) {
            const { _id } = action.payload;
            var qtyById = {};
            let tempCart = Object.entries(state.quantityById);
            for (var x = 0;x < tempCart.length;x += 2) {
                let key = tempCart[x];
                let value = tempCart[++x];
                if (key !== _id) {
                    qtyById[`${key}`] = value;
                }
            }
            state.quantityById = { ...qtyById };
        },
        checkout(state, action) {
            return initialState;
        }
    }
});

export const { addToCart, plusOne, minusOne, removeAllFromCart, checkout } = cartSlice.actions;

export default cartSlice.reducer;