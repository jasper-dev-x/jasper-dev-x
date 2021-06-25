import {
    CREATE_ITEM,
    DELETE_ITEM,
    UPDATE_ITEM,
    LOAD_INVENTORY_IN_PROGRESS,
    LOAD_INVENTORY_SUCCESS,
    LOAD_INVENTORY_FAILURE
} from './actions';

const initState = { isLoading: false, data: [] };

export const inventory = (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case CREATE_ITEM: {
            const { name, price, quantity } = payload;
            const newItem = {
                name,
                price,
                quantity
            };
            return { ...state, data: state.data.concat(newItem) };
        }
        case DELETE_ITEM: {
            const { id } = payload;
            return { ...state, data: state.data.filter((item) => item._id.$oid !== id) };
        }
        case UPDATE_ITEM: {
            const { _id, name, price, quantity } = payload;
            const updatedItem = {
                _id,
                name,
                price,
                quantity
            };
            return { ...state, data: state.data.filter((item) => item._id.$oid !== _id.$oid).concat(updatedItem) };
        }
        case LOAD_INVENTORY_SUCCESS: {
            const { inventory } = payload;
            return inventory ? { ...state, isLoading: false, data: inventory } : state;
        }
        case LOAD_INVENTORY_IN_PROGRESS: {
            return { ...state, isLoading: true };
        }
        case LOAD_INVENTORY_FAILURE: {
            return { ...state, isLoading: false };
        }
        default:
            return state;
    }
};