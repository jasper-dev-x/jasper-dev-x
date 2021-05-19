import React from 'react';
import ToDoList from './ToDoList';

export default function Menu() {
    const todos = [
        { text: 'Test ToDo List' }
    ];

    return (
        <div className="d-flex flex-fill justify-content-center pt-5">
            <ToDoList todos={ todos } />
        </div>
    );
};