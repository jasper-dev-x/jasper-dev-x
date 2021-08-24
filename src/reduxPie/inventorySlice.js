import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    data: []
};

// ----- API GET ALL
export const apiGetAllItems = createAsyncThunk('inventory/apiGetAllItems', async () => {
    const AllItems = await fetch("https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/jasperdevx-daptd/service/inventory/incoming_webhook/getAllItems")
        .then(res => res.json())
        .catch((err) => console.error("ERROR LOAD items: ", err));
    return AllItems;
});

// ----- API CREATE
export const apiCreateItem = createAsyncThunk('inventory/apiCreateItem', async ({ name, price, quantity }) => {
    const requestOptions = {
        method: "POST",
        body: JSON.stringify({
            name,
            price: { $numberInt: price },
            quantity: { $numberInt: quantity }
        })
    };
    // ----- FIXES UNKNOWN ISSUE: newId does NOT carry its value to the return
    // By using x, somehow it pulls it back into reality
    var x;
    const newId = await fetch("https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/jasperdevx-daptd/service/inventory/incoming_webhook/createItem", requestOptions)
        .then(res => res.json())
        .then(y => x = y)
        .catch((err) => console.error("ERROR CREATE ITEM: ", err));
    return newId ? newId : x;
});

// ----- API UPDATE
export const apiUpdateItem = createAsyncThunk('inventory/apiUpdateItem', async ({ _id, name, price, quantity }) => {
    const requestOptions = {
        method: "PUT",
        body: JSON.stringify({
            _id: { $oid: _id },
            name,
            price: { $numberInt: price },
            quantity: { $numberInt: quantity }
        })
    };
    await fetch("https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/jasperdevx-daptd/service/inventory/incoming_webhook/updateItem", requestOptions)
        .catch((err) => console.error("ERROR UPDATE ITEM: ", err));
});

// ----- API DELETE
export const apiDeleteItem = createAsyncThunk('items/apiDeleteItem', async (id) => {
    const requestOptions = {
        method: "DELETE"
    };
    await fetch(`https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/jasperdevx-daptd/service/inventory/incoming_webhook/removeItem?id=${id}`, requestOptions)
        .catch((err) => console.error("ERROR REMOVE ITEM: ", err));
});

const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        createItem(state, action) {
            const { name, price, quantity } = action.payload;
            state.data.unshift({
                _id: null,
                name,
                price: {
                    $numberInt: price
                },
                quantity: {
                    $numberInt: quantity
                }
            });
        },
        deleteItem(state, action) {
            const { _id } = action.payload;
            return {
                ...state,
                data: state.data.filter((x) => x._id.$oid !== _id)
            };
        },
        updateItem(state, action) {
            const { _id, name, price, quantity } = action.payload;
            return {
                ...state,
                data: [
                    { _id, name, price: { $numberInt: price }, quantity: { $numberInt: quantity } },
                    ...state.data.filter((x) => x._id.$oid !== _id)
                ]
            };
        },
        initInventory(state, action) {
            return initialState;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(apiGetAllItems.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(apiGetAllItems.fulfilled, (state, action) => {
                const items = action.payload;
                state.data = items ? items : [];
                state.isLoading = false;
            })
            .addCase(apiGetAllItems.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(apiCreateItem.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(apiCreateItem.fulfilled, (state, action) => {
                const { insertedId } = action.payload;
                const newItemIndex = state.data.findIndex((x) => x._id === null);
                state.data[newItemIndex]._id = insertedId;
                state.isLoading = false;
            })
            .addCase(apiCreateItem.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(apiDeleteItem.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(apiDeleteItem.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(apiDeleteItem.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(apiUpdateItem.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(apiUpdateItem.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(apiUpdateItem.rejected, (state, action) => {
                state.isLoading = false;
            });
    }
});

export const { createItem, deleteItem, updateItem, initInventory } = inventorySlice.actions;

export default inventorySlice.reducer;