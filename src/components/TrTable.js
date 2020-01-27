import React from 'react'
import { MdModeEdit, MdDeleteForever } from 'react-icons/md'
import { Button } from 'react-bootstrap'

export default function TrTable({ id, nome, telefone, editar, deletar }){
    return (
    <tr key={id}>
        <td>{nome}</td>
        <td>{telefone}</td>
        <td><Button variant="warning" onClick={() => editar(id)}><MdModeEdit /></Button></td>
        <td><Button variant="danger" onClick={() => deletar(id)}><MdDeleteForever /></Button></td>
    </tr>
    )
}