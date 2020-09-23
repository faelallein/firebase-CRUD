import React, { useCallback, useEffect, useState }from 'react';
import AddTask from './AddTask/AddTask'
import ListTask from './ListTask/ListTask'
import firebase from '../firebase'
import { useTasks } from '../context/tasks';
import { LocalStorage } from '../util/localStorage'
import { requestFirebase } from '../util/RequestFir'

function Todo() {
    const { tasks, setTasks } = useTasks()
    const [ titleName , setTitleName ] = useState()
    const [ getLocal ] = useState(LocalStorage.getLocalStorage('todoApp'))

    const ComparaLocalStorage = useCallback(async () => {
        //Da um Get na informação do Firebase
        let resp = await requestFirebase.get(`/listsUsers/${Object.keys(getLocal)[0]}`)
        //garante que tenha algo no local storage
        if (getLocal) {
            //compara a informação do local storage com a informação no firebase
            if (resp.tasks !== Object.values(getLocal)[0].tasks) {
                //se a informação for diferente substitui no local storage
                let auxLocal = {}
                auxLocal[Object.keys(getLocal)[0]] = resp
                LocalStorage.updateLocalStorage('todoApp', auxLocal)
                //atualiza o contexto
                setTasks(auxLocal)
            }
        }
    },[getLocal, setTasks])
    
    const LocalStorageVazio = useCallback(() => {
        //pega key no firebase
        let keyFb = firebase.database().ref().child('listsUsers').push().key
        //pede o nome de usuario
        let name = prompt("Digite seu nome: ")
        let data = { [keyFb]: { nome: name, tasks: [] } }

        //adiciona ao localStorage
        LocalStorage.updateLocalStorage('todoApp', data)
        //Adiciona ao firebase
        requestFirebase.update(keyFb, data[keyFb])

        setTasks(data)
    }, [setTasks]) 
    
    useEffect(() => {  
        if (!getLocal){
            LocalStorageVazio()
        } else {
            ComparaLocalStorage()                        
        }
    }, [ComparaLocalStorage, LocalStorageVazio, getLocal])

    useEffect(() => {
        if(tasks !== false){
            //define o titulo da lista de tarefas
            setTitleName(tasks[Object.keys(tasks)[0]].nome)
        }       
    },[tasks])
    
    return <div>
        <br />
        <div className="container">
            <h1>{titleName}</h1>
        </div>        
        <br/>
        <AddTask />
        <ListTask />
    </div>;
}

export default Todo;