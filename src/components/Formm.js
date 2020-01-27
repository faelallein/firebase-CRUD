import React from 'react'
import { Form , Button } from 'react-bootstrap'
import { IoIosSearch } from 'react-icons/io'

export default function Formm({ set, adicionar, ordena, contato }) {
    return (
        <div>
            <Form.Control id='nome' type="text" placeholder="Nome" onInput={e => set({ "nome": e.target.value, "telefone": contato.telefone })} /> <br />
            <Form.Control id='telefone' type="text" placeholder="Telefone" onInput={e => set({ "nome": contato.nome, "telefone": e.target.value })} /> <br />
            <Button variant="primary" onClick={() => adicionar()}>Adicionar</Button> <br /> <br />
            <div style={{ display: 'flex' }}>
                <Form.Control id='busca' type="text" placeholder="Busca por Nome" />
                <Button variant="primary" onClick={() => ordena(document.querySelector('#busca').value)}><IoIosSearch /></Button>
            </div>
        </div>
    )
}