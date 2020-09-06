import React from 'react';
import firebase from '../../firebase'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import { requestFirebase } from '../../util/RequestFir'
import { useTasks } from '../../context/tasks'

function AddTask() {
    const { tasks, setTasks } = useTasks() 
    const [ task , setTask ] = React.useState({
        task : '',
        do : false
    })

    const add = async () => {
        //cria key direto do firebase
        let key = await firebase.database().ref().child('tasks').push().key
        
        //atualiza o contexto tasks
        let auxTasks = tasks
        auxTasks[key] = task
        setTasks({ ...auxTasks })        

        //adiciona ao firebase
        await requestFirebase.update(`/tasks/${key}`, task)
        
        //limpa o input e o state
        document.querySelector("#inputTask").value = ""
        setTask({
            task: '',
            do: false
        })
    }

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