import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    data: []
};

// ----- API GET ALL
export const apiGetAllAccounts = createAsyncThunk('accounts/apiGetAllAccounts', async () => {
    var loopBack;
    const accounts = await fetch("https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/jasperdevx-daptd/service/accounts/incoming_webhook/getAccounts")
        .then(res => res.json())
        .then(res => loopBack = res)
        .catch((err) => console.error("ERROR API GET ALL ACCOUNTS: ", err));
    return accounts ? accounts : loopBack;
});

// ----- API CREATE
export const apiCreateAccount = createAsyncThunk('accounts/apiCreateAccount', async ({ name, email, phone }) => {
    const requestOptions = {
        method: "POST",
        body: JSON.stringify({
            name: name,
            email: email,
            phone: { $numberLong: phone }
        })
    };
    var loopBack;
    const newId = await fetch("https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/jasperdevx-daptd/service/accounts/incoming_webhook/createAccount", requestOptions)
        .then(res => res.json())
        .then(res => loopBack = res)
        .catch((err) => console.error("ERROR API CREATE ACCOUNT: ", err));
    return newId ? newId : loopBack;
});

// ----- API UPDATE
export const apiUpdateAccount = createAsyncThunk('accounts/apiUpdateAccount', async ({ _id, name, email, phone }) => {
    const requestOptions = {
        method: "PUT",
        body: JSON.stringify({
            _id: {
                $oid: _id
            },
            name,
            email,
            phone: {
                $numberLong: phone
            }
        })
    };
    await fetch("https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/jasperdevx-daptd/service/accounts/incoming_webhook/updateAccount", requestOptions)
        .catch((err) => console.error("ERROR API UPDATE ACCOUNT: ", err));
});


// ----- API DELETE
export const apiDeleteAccount = createAsyncThunk('accounts/apiDeleteAccount', async ({ _id }) => {
    const requestOptions = {
        method: "DELETE"
    };
    await fetch(`https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/jasperdevx-daptd/service/accounts/incoming_webhook/deleteAccount?id=${_id.$oid}`, requestOptions)
        .catch((err) => console.error("ERROR API DELETE ACCOUNT: ", err));
});

// ----- ACCOUNT SLICE
const accountSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
        createAccount(state, action) {
            const { name, email, phone } = action.payload;
            return {
                ...state,
                data: [{ _id: null, name, email, phone: { $numberLong: phone } }, ...state.data]
            };
        },
        deleteAccount(state, action) {
            const { _id } = action.payload;
            return {
                ...state,
                data: state.data.filter((x) => x._id.$oid !== _id.$oid)
            };
        },
        updateAccount(state, action) {
            const { _id, name, email, phone } = action.payload;
            console.log(action.payload);
            return {
                ...state,
                data: [{ _id, name, email, phone }, ...state.data.filter((x) => x._id.$oid !== _id).slice()]
            };
        },
        initAccounts(state, action) {
            return initialState;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(apiGetAllAccounts.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(apiGetAllAccounts.fulfilled, (state, action) => {
                const accounts = action.payload;
                state.data = accounts;
                state.isLoading = false;
            })
            .addCase(apiGetAllAccounts.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(apiCreateAccount.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(apiCreateAccount.fulfilled, (state, action) => {
                const { insertedId } = action.payload;
                const newAccountIndex = state.data.findIndex((x) => x._id === null);
                state.data[newAccountIndex]._id = insertedId;
                state.isLoading = false;
            })
            .addCase(apiCreateAccount.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(apiDeleteAccount.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(apiDeleteAccount.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(apiDeleteAccount.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(apiUpdateAccount.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(apiUpdateAccount.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(apiUpdateAccount.rejected, (state, action) => {
                state.isLoading = false;
            });
    }
});

export const { createAccount, deleteAccount, updateAccount, initAccounts } = accountSlice.actions;

export default accountSlice.reducer;