// DEMO THUNK
export const displayAlert = (item) => () => {
    alert(`Item Created: ${item.name} for $ ${item.price}`);
};