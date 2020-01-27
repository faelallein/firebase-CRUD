import React from 'react';
import { Form, Button, Col, Container, Row, Table } from 'react-bootstrap'
import { GetFire, PostFire, UpdateFire, DeleteFire, OrdenaFire } from './util/RequestFir'

function App() {
  const [view, setView] = React.useState('')
  const [contato, setContato] = React.useState({
    "nome": '',
    "telefone": ''
  })

  const renderiza = () => {
    GetFire()
      .then(res => {
        let auxID = res.docs.map(m => m.id)
        let aux = res.docs.map(map => map.data())        
        let auxView = aux.map((e , i) => {
          return <tr key={auxID[i]}>
            <td>{e.nome}</td>
            <td>{e.telefone}</td>
            <td><Button variant="warning" onClick={() => editar(auxID[i])}>Editar</Button></td>
            <td><Button variant="danger" onClick={() => deletar(auxID[i])}>Deletar</Button></td>
          </tr>
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

  const acidionar = () => {
    PostFire(contato)
    renderiza()
  }

  const editar = (id ) => {
    UpdateFire(id, contato)
      .then(c => renderiza())    
  }

  const deletar = (id) => {
    DeleteFire(id)
      .then(c => renderiza())
  }

  const ordena = () => {
    let a = OrdenaFire()
    console.log(a)
  }

  return (
    <div>
      <br />
      <Container>
        <Row className="justify-content-md-center">
          <Col xs lg="8">
            <Form.Control id='nome' type="text" placeholder="Nome" onInput={e => setContato({ "nome": e.target.value, "telefone": contato.telefone })} /> <br />
            <Form.Control id='telefone' type="text" placeholder="Telefone" onInput={e => setContato({ "nome": contato.nome, "telefone": e.target.value })} /> <br />
            <Button variant="primary" onClick={() => acidionar()}>Adicionar</Button>
            <Button variant="primary" onClick={() => ordena()}>Ordena</Button>
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