import React from 'react'
import { Table } from 'react-bootstrap'

export default function Tablee({ v }){
    return(
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
                    {v}
                </tbody>
            </Table>
        </div>
    )
}