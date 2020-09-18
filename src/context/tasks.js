import React, {createContext, useState, useContext } from "react";

export const TaskContext = createContext();

export default function TaskProvider({children}){
    const [tasks, setTasks] = useState(
        {
        name : '',
        tasks : []
        }) 

    return <TaskContext.Provider value={{
        tasks,
        setTasks,
    }}>
        {children}
    </TaskContext.Provider>

}

export function useTasks(){
    const context = useContext(TaskContext)
    const { tasks, setTasks } = context;
    return { tasks, setTasks }
}