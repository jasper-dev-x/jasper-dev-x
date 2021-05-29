import {
    CREATE_ITEM,
    DELETE_ITEM,
    UPDATE_ITEM,
    LOAD_INVENTORY_IN_PROGRESS,
    LOAD_INVENTORY_SUCCESS,
    LOAD_INVENTORY_FAILURE
} from './actions';

export const inventoryIsLoading = (state = false, action) => {
    const { type } = action;

    switch (type) {
        case LOAD_INVENTORY_IN_PROGRESS:
            return true;
        case LOAD_INVENTORY_SUCCESS:
        case LOAD_INVENTORY_FAILURE:
            return false;
        default:
            return state;
    }
};

export const inventory = (state = [], action) => {
    const { type, payload } = action;

    switch (type) {
        case CREATE_ITEM: {
            const { name, price, quantity } = payload;
            const newItem = {
                name,
                price,
                quantity
            };
            return state.concat(newItem);
        }
        case DELETE_ITEM: {
            const { id } = payload;
            return state.filter((item) => item._id.$oid !== id);
        }
        case UPDATE_ITEM: {
            const { name, price, quantity } = payload;
            const updatedItem = {
                name,
                price,
                quantity
            };
            return state.filter((item) => item.name !== name).concat(updatedItem);
        }
        case LOAD_INVENTORY_SUCCESS: {
            const { inventory } = payload;
            return inventory ? inventory : state;
        }
        case LOAD_INVENTORY_IN_PROGRESS: {
            return state;
        }
        case LOAD_INVENTORY_FAILURE: {
            return state;
        }
        default:
            return state;
    }
};