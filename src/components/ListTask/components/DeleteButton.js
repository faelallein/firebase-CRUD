import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { requestFirebase } from '../../../util/RequestFir';
import { useTasks } from '../../../context/tasks';

// import { Container } from './styles';

function DeleteButton({ keyId }) {
    const { tasks, setTasks } = useTasks()
    const [ key ] = useState(Object.keys(tasks)[0])

    const deletar = (ref) => {        
        //atualiza a imagem e desliga a edição
        let auxTasks = tasks
        auxTasks[key].tasks.splice(ref, 1)
        setTasks({ ...auxTasks })

        //deleta o item do firebase
        requestFirebase.update(`/${key}/`, { ...auxTasks[key] })       
    }

    return <Button variant="danger" onClick={() => deletar(keyId)}>Delete</Button>;
}

export default DeleteButton;