// CREATE
export const CREATE_TODO = 'CREATE_TODO';
export const createTodo = (text) => ({
    type: CREATE_TODO,
    payload: { text }
});

// DELETE
export const REMOVE_TODO = 'REMOVE_TODO';
export const removeTodo = (text) => ({
    type: REMOVE_TODO,
    payload: { text }
});

// MARK AS COMPLETE
export const MARK_DONE = 'MARK_DONE';
export const markDone = (text) => ({
    type: MARK_DONE,
    payload: { text }
});