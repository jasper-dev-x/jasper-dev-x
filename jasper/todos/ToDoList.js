import React from 'react';
import { connect } from 'react-redux';
import ToDoListItem from './ToDoListItem';
import ToDoForm from './ToDoForm';
import { removeTodo, markDone } from './actions';

const mapStateToProps = state => ({
    todos: state.todos
});
const mapDispatchToProps = dispatch => ({
    onRemoveTodo: (text) => dispatch(removeTodo(text)),
    onMarkDone: (text) => dispatch(markDone(text))
});

export function ToDoList({ todos, onRemoveTodo = x => x, onMarkDone = x => x }) {

    return (
        <div className="d-flex flex-column">
            <ToDoForm />
            <hr></hr>
            { todos.map((item, key) => (
                <ToDoListItem key={ key } todo={ item } onRemoveTodo={ onRemoveTodo } onMarkDone={ onMarkDone } />
            )) }
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);