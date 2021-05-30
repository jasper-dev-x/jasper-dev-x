import { loadInventoryInProgress, loadInventorySuccess, loadInventoryFailure } from './actions';

// DEMO THUNK
export const displayAlert = () => () => {
    alert(`Sorting...`);
};

// LOAD INVENTORY 
export const loadInventory = () => async (dispatch, getState) => {
    try {
        dispatch(loadInventoryInProgress());
        const inventory = await fetch("https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/jasperdevx-daptd/service/inventory/incoming_webhook/getInventory")
            .then(res => res.json());
        dispatch(loadInventorySuccess(inventory));
    } catch (err) {
        dispatch(loadInventoryFailure());
        console.error("ERROR LOAD INVENTORY: ", err);
    }

};

// CREATE ITEM

export const createItem = (item) => async (dispatch, getState) => {
    const requestOptions = {
        method: "POST",
        body: JSON.stringify({
            name: item.name,
            price: { $numberInt: item.price },
            quantity: { $numberInt: item.quantity }
        })
    };
    await fetch("https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/jasperdevx-daptd/service/inventory/incoming_webhook/addItem", requestOptions)
        .catch((err) => console.error("ERROR CREATE ITEM: ", err));
};

// DELETE ITEM

export const deleteItem = (id) => async (dispatch, getState) => {
    const requestOptions = {
        method: "DELETE"
    };
    await fetch(`https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/jasperdevx-daptd/service/inventory/incoming_webhook/removeItem?id=${id}`, requestOptions)
        .catch((err) => console.error("ERROR REMOVE ITEM: ", err));
};

// UPDATE ITEM

export const updateItem = (item) => async (dispatch, getState) => {
    const { oid, name, price, quantity } = item;
    const requestOptions = {
        method: "PUT",
        body: JSON.stringify({
            _id: {
                $oid: oid
            },
            name,
            price: {
                $numberInt: price
            },
            quantity: {
                $numberInt: quantity
            }
        })
    };
    await fetch("https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/jasperdevx-daptd/service/inventory/incoming_webhook/updateItem", requestOptions)
        .catch((err) => console.error("ERROR UPDATE ITEM: ", err));
};