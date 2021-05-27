import { CREATE_ACCOUNT, DELETE_ACCOUNT, UPDATE_ACCOUNT } from './actions';

export const accounts = (state = [], action) => {
    const { type, payload } = action;

    switch (type) {
        case CREATE_ACCOUNT: {
            const { name, email, phone } = payload;
            const newAccount = {
                name,
                email,
                phone
            };
            return state.concat(newAccount);
        }
        case DELETE_ACCOUNT: {
            const { phone } = payload;
            return state.filter((account) => account.phone !== phone);
        }
        case UPDATE_ACCOUNT: {
            const { name, email, phone } = payload;
            const updatedAccount = {
                name,
                email,
                phone
            };
            return state.filter((account) => account.phone !== phone).concat(updatedAccount);
        }
        default:
            return state;
    }
};
