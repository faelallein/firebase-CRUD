import React from 'react';
//Bootstrap
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
//Util e Context
import { requestFirebase } from '../../../util/RequestFir'
import { useTasks } from '../../../context/tasks'


function Task({ keyId, dataUnq }) {
    const { tasks, setTasks } = useTasks()
    const [ task, setTask ] = React.useState(dataUnq.task)

    const deletar = (ref) => {
        //deleta o item do firebase
        requestFirebase.del(ref)

        //deleta o item da imagem
        let auxTasks = tasks
        delete auxTasks[ref]
        setTasks({ ...auxTasks })
    }

    const done = (ref, data) => {
        //edita o item do firebase
        requestFirebase.update(`/tasks/${ref}/`, { ...data, do: true })

        //edit o item da imagem
        let auxTasks = tasks
        auxTasks[ref].do = true
        setTasks({ ...auxTasks })
    }
    
    const openEdit = (ref) => {
        //Liga a edição
        let auxTask = tasks
        auxTask[ref].edit = true
        setTasks({ ...auxTask })
    }

    const closeEdit = (ref, data) => {
        //atualiza a imagem e desliga a edição
        let auxTask = tasks
        delete auxTask[ref].edit
        auxTask[ref].task = task
        setTasks({ ...auxTask })

        //edita o item do firebase
        requestFirebase.update(`/tasks/${ref}/`, { ...data, task: task })
    }

    const handleEdit = (value) => {
        setTask(value)
    }


    if(dataUnq.edit !== true){
        return <tr key={keyId}>
            <td>{dataUnq.task}</td>
            <td><Button variant="info" onClick={() => done(keyId, dataUnq)}>Do</Button></td>
            <td><Button variant="warning" onClick={() => openEdit(keyId)}>Edit</Button></td>
            <td><Button variant="danger" onClick={() => deletar(keyId)}>Delete</Button></td>
        </tr>;
    }else{
        return <tr key={keyId}>
            <td colSpan="3">
                <Form.Control type="text" value={task} onChange={e => {handleEdit(e.target.value)}} />
            </td>            
            <td><Button variant="warning" onClick={() => closeEdit(keyId, dataUnq)}>Edit</Button></td>
        </tr>
    }
    
}

export default Task;