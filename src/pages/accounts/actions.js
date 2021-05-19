// ----- CREATE ----- //
export const CREATE_ACCOUNT = 'CREATE_ACCOUNT';
export const createAccount = (account) => ({
    type: CREATE_ACCOUNT,
    payload: {
        name: account.name,
        phone: account.phone
    }
});

// ----- DELETE ----- //
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';
export const deleteAccount = (phone) => ({
    type: DELETE_ACCOUNT,
    payload: {
        phone
    }
});

