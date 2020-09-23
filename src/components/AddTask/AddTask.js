import React, {useEffect} from 'react';
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import { requestFirebase } from '../../util/RequestFir'
import { useTasks } from '../../context/tasks'
import { LocalStorage } from '../../util/localStorage'

function AddTask() {
    const { tasks, setTasks } = useTasks()
    const [ key, setKey ] = React.useState(Object.keys(tasks)[0])
    const [ task , setTask ] = React.useState({
        task : '',
        do : false
    })

    const add = () => {
        //atualiza o contexto tasks
        let auxTasks = tasks
        auxTasks[key].tasks.push(task) 
        setTasks({ ...auxTasks })        

        //adiciona ao firebase
        requestFirebase.update(key, tasks[key])
        
        //atualiza o localstorage
        LocalStorage.updateLocalStorage('todoApp', tasks)

        //limpa o input e o state
        document.querySelector("#inputTask").value = ""
        setTask({
             task: '',
             do: false
        })
    }

    useEffect(() => {
        setKey(Object.keys(tasks)[0])
    }, [tasks])

    return <Container>
            <Row fluid="md" className="justify-content-md-center">
                <Col md="12">
                    <Form>
                        <Form.Group md="4">
                            {/* Input de tasks */}
                            <Form.Label>Tasks</Form.Label>
                            <Form.Control type="text" name="firstName" onInput={e => setTask({...task , task : e.target.value})} id="inputTask"/>
                            <br/>
                            {/* Botão de adição das tasks */}
                            <Button variant="success" type="button" onClick={() => add()}>
                                Adicionar
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
}

export default AddTask;