import React from 'react';

// import { Container } from './styles';

function DoneTask({ keyId, dataUnq }) {
    return <tr key={keyId}>
        <td colSpan="4"><strike style={{ color: 'gray' }}>{dataUnq.task}</strike></td>
    </tr>
}

export default DoneTask;