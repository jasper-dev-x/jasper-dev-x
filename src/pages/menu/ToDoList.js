import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ToDoListItem from './components/ToDoListItem';
import ToDoForm from './components/ToDoForm';
import { removeTodo, markDone } from './actions';
import { displayAlert } from './thunks';

const mapStateToProps = state => ({
    todos: state.todos
});
const mapDispatchToProps = dispatch => ({
    onRemoveTodo: (text) => dispatch(removeTodo(text)),
    onMarkDone: (text) => dispatch(markDone(text)),
    onDisplayAlert: (text) => dispatch(displayAlert(text))
});

export function ToDoList({ todos = [], onRemoveTodo = x => x, onMarkDone = x => x, onDisplayAlert = x => x }) {

    useEffect(() => {
        console.log(todos);
    });

    return (
        <div className="d-flex flex-column">
            <button className="btn btn-info mb-3" onClick={ () => onDisplayAlert('Alert Works.') }>Alert</button>
            <ToDoForm />
            <hr className={ `bg-dark` }></hr>
            { todos.map((item, key) => (
                <ToDoListItem key={ key } todo={ item } onRemoveTodo={ onRemoveTodo } onMarkDone={ onMarkDone } />
            )) }
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);