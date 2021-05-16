import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createTodo } from './actions';

const mapStateToProps = state => ({
    todos: state.todos
});
const mapDispatchToProps = dispatch => ({
    onCreateTodo: (text) => dispatch(createTodo(text))
});

export function ToDoForm({ todos, onCreateTodo }) {
    const [inputToDo, setInputToDo] = useState('');
    return (
        <div className="d-flex">
            <input type="text" className="form-control" value={ inputToDo } onChange={ (x) => setInputToDo(x.target.value) } />
            <button className="btn btn-primary" onClick={ () => {
                const isDuplicateText =
                    todos.some((todo) => todo.text === inputToDo);
                if (!isDuplicateText) {
                    onCreateTodo(inputToDo);
                    setInputToDo('');
                }
            } }>Add</button>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoForm);