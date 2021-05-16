import React from 'react';

export default function ToDoListItem({ todo, onRemoveTodo = x => x, onMarkDone = x => x }) {

    return (
        <div className="d-flex flex-column align-items-center py-4">
            <h1 className="display-6">{ todo.text }</h1>
            <div className="d-flex">
                { todo.isCompleted ? null :
                    <button className="btn btn-outline-success" onClick={ () => onMarkDone(todo.text) }>Mark As Complete</button>
                }
                <button className="btn btn-outline-danger" onClick={ () => onRemoveTodo(todo.text) }>Remove</button>
            </div>
        </div>
    );
}