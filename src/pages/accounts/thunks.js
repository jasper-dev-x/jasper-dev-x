import {
    loadAccountsInProgress,
    loadAccountsSuccess,
    loadAccountsFailure
} from './actions';

// GET ALL ACCOUNTS
export const loadAccounts = () => async (dispatch, getState) => {
    try {
        dispatch(loadAccountsInProgress());
        const accounts = await fetch("https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/jasperdevx-daptd/service/accounts/incoming_webhook/getAccounts")
            .then(res => res.json());
        dispatch(loadAccountsSuccess(accounts));
    } catch (err) {
        dispatch(loadAccountsFailure());
        console.error("ERROR LOAD ACCOUNTS: ", err);
    }
};

// CREATE ACCOUNT
export const createAccount = (account) => async (dispatch, getState) => {
    const requestOptions = {
        method: "POST",
        body: JSON.stringify({
            name: account.name,
            email: account.email,
            phone: { $numberLong: account.phone }
        })
    };
    await fetch("https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/jasperdevx-daptd/service/accounts/incoming_webhook/addAccount", requestOptions)
        .catch((err) => console.error("ERROR CREATE ACCOUNT: ", err));
};

// DELETE ACCOUNT
export const deleteAccount = (id) => async (dispatch, getState) => {
    const requestOptions = {
        method: "DELETE"
    };
    await fetch(`https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/jasperdevx-daptd/service/accounts/incoming_webhook/removeAccount?id=${id}`, requestOptions)
        .catch((err) => console.error("ERROR REMOVE ACCOUNT: ", err));
};

// UPDATE ACCOUNT
export const updateAccount = () => async (dispatch, getState) => {
    try {

    } catch (err) {
        console.error("ERROR UPDATE ACCOUNT: ", err);
    }
};
