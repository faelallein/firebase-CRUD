import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useTasks } from '../../context/tasks'
import { LocalStorage } from '../../util/localStorage'
//Component
import Task from './components/Task'
import DoneTask from './components/DoneTask'

function ListTask() {
    const { tasks } = useTasks()
    const [ taskList, setTaskList ] = useState([])

    useEffect(() => {
        if (tasks !== false ) {
            setTaskList(Object.values(tasks)[0].tasks)
            LocalStorage.updateLocalStorage('todoApp', tasks)
        }
    },[tasks])

    return <Container style={{height: 750, overflowY:'scroll'}}>
        <Row fluid="md" className="justify-content-md-center">
            <Col md="12">
                <Table responsive="sm">
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Do</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                        {taskList !== false ? taskList.map((map, index) => {
                            if(map.do === true){
                                //retorno da tarefa feita
                                return <DoneTask key={index} keyId={index} dataUnq={map} />} 
                                else {
                                //retorno da tarefa por fazer 
                                return <Task key={index} keyId={index} dataUnq={map} />}  
                            }) : 
                        <tr>
                            <td>Vazio</td>
                        </tr>}
                </tbody>
            </Table>
            </Col>
        </Row>
    </Container>
}



export default ListTask;