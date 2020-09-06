import React from 'react';
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { requestFirebase } from '../../util/RequestFir'
import { useTasks } from '../../context/tasks'
//Component
import Task from './components/Task'
import DoneTask from './components/DoneTask'

function ListTask() {
    const { tasks, setTasks } = useTasks()

    React.useEffect(() => {
        //copia os dados do firebase para a imagem
        requestFirebase.get().then((s) => {setTasks(s.tasks)})
    },[setTasks])

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
                        {tasks !== '' ? Object.values(tasks).reverse().map((map, index) => {
                            if(map.do === true){
                                //retorno da tarefa feita
                                return <DoneTask key={Object.keys(tasks).reverse()[index]} keyId={Object.keys(tasks).reverse()[index]} dataUnq={map} />} 
                                else {
                                //retorno da tarefa por fazer 
                                return <Task key={Object.keys(tasks).reverse()[index]} keyId={Object.keys(tasks).reverse()[index]} dataUnq={map} />}  
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