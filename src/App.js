import React from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap'
import { GetFire, PostFire, UpdateFire, DeleteFire, OrdenaFire } from './util/RequestFir'
import TrTable from './components/TrTable'
import Formm from './components/Formm'

function App() {
    const [view, setView] = React.useState('')
    const [contato, setContato] = React.useState({
        "nome": '',
        "telefone": ''
    })
    const [busca, setBusca] = React.useState('')

    const renderiza = () => {
        GetFire()
            .then(res => {
                let auxID = res.docs.map(m => m.id)
                let aux = res.docs.map(map => map.data())
                let auxView = aux.map((e, i) => {
                    return <TrTable 
                                id={auxID[i]} nome={e.nome} 
                                telefone={e.telefone} editar={editar} 
                                deletar={deletar} 
                            />
                })
                setView(auxView)
            })
    }

    React.useEffect(() => {
        renderiza()
    }, [])

    React.useEffect(() => {
        renderiza()
    }, [contato])

    const adicionar = () => {
        PostFire(contato)
        renderiza()
    }

    const editar = (id) => {
        UpdateFire(id, contato)
            .then(c => renderiza())
    }

    const deletar = (id) => {
        DeleteFire(id)
            .then(c => renderiza())
    }

    const ordena = (buscaNome) => {
        OrdenaFire(buscaNome).then(res => {
            let d = res.docs[0].data()            
            setBusca(`Nome : ${d.nome} || Telefone: ${d.telefone}`)
        })

    }

    return (
        <div>
            <br />
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs lg="8">
                        <Formm set={setContato} adicionar={adicionar} ordena={ordena} contato={contato} />
                        <br />
                        {busca}
                    </Col>
                </Row>
            </Container><br />
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs lg="8">
                        <div>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Telefone</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {view}
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;