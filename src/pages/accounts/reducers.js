import { CREATE_ACCOUNT, DELETE_ACCOUNT } from './actions';

export const accounts = (state = [], action) => {
    const { type, payload } = action;

    switch (type) {
        case CREATE_ACCOUNT: {
            const { name, phone } = payload;
            const newAccount = {
                name,
                phone
            };
            return state.concat(newAccount);
        }
        case DELETE_ACCOUNT: {
            const { phone } = payload;
            return state.filter((account) => account.phone !== phone);
        }
        default:
            return state;
    }
};
