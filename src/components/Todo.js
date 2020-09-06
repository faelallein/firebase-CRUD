import React from 'react';
import AddTask from './AddTask/AddTask'
import ListTask from './ListTask/ListTask'

function Todo() {
    return <div>
        <br/>
        <AddTask/>
        <ListTask />
    </div>;
}

export default Todo;