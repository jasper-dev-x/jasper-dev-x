// ----- CREATE ----- //
export const CREATE_ACCOUNT = 'CREATE_ACCOUNT';
export const createAccount = ({ name, email, phone }) => ({
    type: CREATE_ACCOUNT,
    payload: {
        _id: {
            $oid: "reload"
        },
        name,
        email,
        phone: {
            $numberLong: phone
        }
    }
});

// ----- DELETE ----- //
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';
export const deleteAccount = (id) => ({
    type: DELETE_ACCOUNT,
    payload: {
        id
    }
});

// ----- UPDATE ----- //
export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';
export const updateAccount = ({ oid, name, email, phone }) => ({
    type: UPDATE_ACCOUNT,
    payload: {
        _id: {
            $oid: oid
        },
        name,
        email,
        phone: {
            $numberLong: phone
        }
    }
});

// LOAD IN PROGRESS
export const LOAD_ACCOUNTS_IN_PROGRESS = 'LOAD_ACCOUNTS_IN_PROGRESS';
export const loadAccountsInProgress = () => ({
    type: LOAD_ACCOUNTS_IN_PROGRESS
});

// LOAD SUCCESS
export const LOAD_ACCOUNTS_SUCCESS = 'LOAD_ACCOUNTS_SUCCESS';
export const loadAccountsSuccess = (accounts) => ({
    type: LOAD_ACCOUNTS_SUCCESS,
    payload: { accounts }
});

// LOAD FAILURE
export const LOAD_ACCOUNTS_FAILURE = 'LOAD_ACCOUNTS_FAILURE';
export const loadAccountsFailure = () => ({
    type: LOAD_ACCOUNTS_FAILURE
});

