import {
    CREATE_ACCOUNT,
    DELETE_ACCOUNT,
    UPDATE_ACCOUNT,
    LOAD_ACCOUNTS_IN_PROGRESS,
    LOAD_ACCOUNTS_SUCCESS,
    LOAD_ACCOUNTS_FAILURE
} from './actions';

export const accountsAreLoading = (state = false, action) => {
    const { type } = action;

    switch (type) {
        case LOAD_ACCOUNTS_IN_PROGRESS:
            return true;
        case LOAD_ACCOUNTS_SUCCESS:
        case LOAD_ACCOUNTS_FAILURE:
            return false;
        default:
            return state;
    }
};

export const accounts = (state = [], action) => {
    const { type, payload } = action;

    switch (type) {
        case CREATE_ACCOUNT: {
            const { name, email, phone } = payload;
            const newAccount = {
                name,
                email,
                phone: { $numberLong: phone }
            };
            return state.concat(newAccount);
        }
        case DELETE_ACCOUNT: {
            const { id } = payload;
            return state.filter((account) => account._id.$oid !== id);
        }
        case UPDATE_ACCOUNT: {
            const { _id, name, email, phone } = payload;
            const updatedAccount = {
                _id,
                name,
                email,
                phone: { $numberLong: phone }
            };
            return state.filter((account) => account._id.$oid !== _id.$oid).concat(updatedAccount);
        }
        case LOAD_ACCOUNTS_SUCCESS: {
            const { accounts } = payload;
            return accounts ? accounts : state;
        }
        case LOAD_ACCOUNTS_IN_PROGRESS:
            return state;
        case LOAD_ACCOUNTS_FAILURE:
            return state;
        default:
            return state;
    }
};
