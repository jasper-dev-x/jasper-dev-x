// ----- CREATE ----- // 
export const CREATE_ITEM = 'CREATE_ITEM';
export const createItem = (item) => ({
    type: CREATE_ITEM,
    payload: {
        name: item.name,
        price: item.price,
        quantity: item.quantity
    }
});

// ----- DELETE ----- //
export const DELETE_ITEM = 'DELETE_ITEM';
export const deleteItem = (name) => ({
    type: DELETE_ITEM,
    payload: {
        name
    }
});

// ----- UPDATE ----- //
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const updateItem = (item) => ({
    type: UPDATE_ITEM,
    payload: {
        name: item.name,
        price: item.price,
        quantity: item.quantity
    }
});