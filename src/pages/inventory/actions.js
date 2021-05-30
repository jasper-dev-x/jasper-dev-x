// ----- CREATE ----- // 
export const CREATE_ITEM = 'CREATE_ITEM';
export const createItem = (item) => ({
    type: CREATE_ITEM,
    payload: {
        name: item.name,
        price: {
            $numberInt: item.price
        },
        quantity: {
            $numberInt: item.quantity
        }
    }
});

// ----- DELETE ----- //
export const DELETE_ITEM = 'DELETE_ITEM';
export const deleteItem = (id) => ({
    type: DELETE_ITEM,
    payload: {
        id
    }
});

// ----- UPDATE ----- //
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const updateItem = (item) => ({
    type: UPDATE_ITEM,
    payload: {
        _id: {
            $oid: item.oid
        },
        name: item.name,
        price: {
            $numberInt: item.price
        },
        quantity: {
            $numberInt: item.quantity
        }
    }
});

// LOAD IN PROGRESS
export const LOAD_INVENTORY_IN_PROGRESS = "LOAD_INVENTORY_IN_PROGRESS";
export const loadInventoryInProgress = () => ({
    type: LOAD_INVENTORY_IN_PROGRESS,
});

// LOAD SUCCESS
export const LOAD_INVENTORY_SUCCESS = "LOAD_INVENTORY_SUCCESS";
export const loadInventorySuccess = (inventory) => ({
    type: LOAD_INVENTORY_SUCCESS,
    payload: { inventory }
});

// LOAD FAILURE
export const LOAD_INVENTORY_FAILURE = "LOAD_INVENTORY_FAILURE";
export const loadInventoryFailure = () => ({
    type: LOAD_INVENTORY_FAILURE,
});