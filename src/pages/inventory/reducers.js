import { CREATE_ITEM, DELETE_ITEM } from './actions';

export const Inventory = (state = [], action) => {
    const { type, payload } = action;

    switch (type) {
        case CREATE_ITEM: {
            const { name, price } = payload;
            const newItem = {
                name,
                price
            };
            return state.concat(newItem);
        }
        case DELETE_ITEM: {
            const { name } = payload;
            return state.filter((item) => item.name !== name);
        }
        default:
            return state;
    }
};