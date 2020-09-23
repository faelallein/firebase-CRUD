import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useTasks } from '../../../context/tasks'
import { requestFirebase } from '../../../util/RequestFir'

function EditForm({ keyId , dataUnq }) {
    const [task, setTask] = React.useState(dataUnq.task)
    const { tasks, setTasks } = useTasks()

    const closeEdit = () => {
        let key = Object.keys(tasks)[0]

        //atualiza a imagem e desliga a edição
        let auxTask = tasks
        delete auxTask[key].tasks[keyId].edit
        auxTask[key].tasks[keyId].task = task
        setTasks({ ...auxTask })

        //edita o item do firebase
        requestFirebase.update(`/${key}/`, { ...auxTask[key] })
    }

    const handleEdit = (value) => {
        setTask(value)
    }
    
    return <tr key={keyId}>
        <td colSpan="3">
            <Form.Control type="text" value={task} onChange={e => { handleEdit(e.target.value) }} />
        </td>
        <td><Button variant="warning" onClick={() => closeEdit()}>Edit</Button></td>
    </tr>;
}

export default EditForm;