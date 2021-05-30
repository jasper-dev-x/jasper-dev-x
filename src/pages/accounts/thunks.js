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
export const createAccount = ({ name, email, phone }) => async (dispatch, getState) => {
    const requestOptions = {
        method: "POST",
        body: JSON.stringify({
            name: name,
            email: email,
            phone: { $numberLong: phone }
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
export const updateAccount = ({ oid, name, email, phone }) => async (dispatch, getState) => {
    const requestOptions = {
        method: "PUT",
        body: JSON.stringify({
            _id: {
                $oid: oid
            },
            name,
            email,
            phone: {
                $numberLong: phone
            }
        })
    };
    await fetch("https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/jasperdevx-daptd/service/accounts/incoming_webhook/updateAccount", requestOptions)
        .catch((err) => console.error("ERROR UPDATE ACCOUNT: ", err));
};
