import React, { useState } from 'react';
//Bootstrap
import Button from 'react-bootstrap/Button'
//Util e Context
import { requestFirebase } from '../../../util/RequestFir'
import { useTasks } from '../../../context/tasks'
import EditForm from './EditForm'
import DeleteButton from './DeleteButton'


function Task({ keyId, dataUnq }) {
    const { tasks, setTasks } = useTasks()
    const [ key ] = useState(Object.keys(tasks)[0])

    const done = () => {
        //edit o item da imagem
        let auxTask = tasks
        auxTask[key].tasks[keyId].do = true
        setTasks({ ...auxTask })

        //edita o item do firebase
        requestFirebase.update(`/${key}/`, { ...auxTask[key] })
    }
    
    const openEdit = () => {
        //Liga a edição
        let auxTask = tasks
        auxTask[key].tasks[keyId].edit = true
        setTasks({ ...auxTask })
    }

    if(dataUnq.edit !== true){
        return <tr key={keyId}>
            <td>{dataUnq.task}</td>
            <td><Button variant="info" onClick={() => done()}>Do</Button></td>
            <td><Button variant="warning" onClick={() => openEdit()}>Edit</Button></td>
            <td><DeleteButton keyId={keyId} /></td>
        </tr>;
    }else{
        return <EditForm keyId={keyId} dataUnq={dataUnq}/>
    }
    
}

export default Task;