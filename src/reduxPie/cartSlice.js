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
            var newAddedIds = [];
            var newQtybyId = {};
            if (state.quantityById[`${_id}`] === 1) {
                // tempCart => [[key, val],[key, val],...]
                let tempCart = Object.entries(state.quantityById);
                for (var x = 0;x < tempCart.length;x++) {
                    let key = tempCart[x][0];
                    let value = tempCart[x][1];
                    if (key !== _id && key) {
                        newAddedIds.push(key);
                        newQtybyId[`${key}`] = value;
                    }
                }
                state.addedIds = newAddedIds;
                state.quantityById = newQtybyId;
            } else {
                state.quantityById[`${_id}`]--;
            }
        },
        removeAllFromCart(state, action) {
            const { _id } = action.payload;
            var newAddedIds = [];
            var newQtybyId = {};
            let tempCart = Object.entries(state.quantityById);
            for (var x = 0;x < tempCart.length;x++) {
                let key = tempCart[x][0];
                let value = tempCart[x][1];
                if (key !== _id && key) {
                    newAddedIds.push(key);
                    newQtybyId[`${key}`] = value;
                }
            }
            state.addedIds = newAddedIds;
            state.quantityById = newQtybyId;
        },
        checkout(state, action) {
            return initialState;
        }
    }
});

export const { addToCart, plusOne, minusOne, removeAllFromCart, checkout } = cartSlice.actions;

export default cartSlice.reducer;