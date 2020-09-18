import React, { useEffect, useState }from 'react';
import AddTask from './AddTask/AddTask'
import ListTask from './ListTask/ListTask'
import firebase from '../firebase'
import { useTasks } from '../context/tasks';
import { LocalStorage } from '../util/localStorage'
import { requestFirebase } from '../util/RequestFir'

function Todo() {
    const { tasks, setTasks } = useTasks()
    const [ titleName , setTitleName ] = useState()

    useEffect(() => {
        let getLocal = LocalStorage.getLocalStorage('todoApp')
        if (!getLocal){
            let keyFb = firebase.database().ref().child('listsUsers').push().key
            let name = prompt("Digite seu nome: ")
            let data = { [keyFb]: { nome : name, tasks: [] } }       
            
            //adiciona ao localStorage
            LocalStorage.updateLocalStorage('todoApp' , data )

            //Adiciona ao firebase
            requestFirebase.update(keyFb , data[keyFb])

            setTasks(data)
        } else {
            setTasks(getLocal)
        }
    }, [setTasks])

    useEffect(() => {
        setTitleName(tasks[Object.keys(tasks)[0]].name)
    },[tasks])
    
    return <div>
        <h1>{titleName}</h1>
        <br/>
        <AddTask/>
        <ListTask />
    </div>;
}

export default Todo;