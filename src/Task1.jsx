import { useState } from 'react';
import './Task1.css';
import { useEffect } from 'react';

export default function Task1() {

    const [task, setTask] = useState('');
    const [taskList, setTaskList] = useState([]);

    const onTaskClick = () =>{
        setTaskList([...taskList, {'taskName':task,'status':false}]);
        setTask('');

        let tmp=[...taskList, {'taskName':task,'status':false}]
        localStorage.setItem('tasks',JSON.stringify(tmp));
    }

    const setTaskChecked = (index) =>{
        let tmp =[]
        for(let i=0;i<taskList.length;i++){
            let element = taskList[i];
            if(i===index){
                element.status = !element.status;
            }
            tmp.push(element);
        }
        setTaskList(tmp);
        localStorage.setItem('tasks',JSON.stringify(tmp));
    }


    const deleteTask = (index) =>{
        let tmp =[]
        for(let i=0;i<taskList.length;i++){
            let element = taskList[i];
            if(index!==i){
                tmp.push(element);

            }
        }
        setTaskList(tmp);
        localStorage.setItem('tasks',JSON.stringify(tmp));
    }

    useEffect(() =>{
        if(localStorage.getItem('tasks')){
            let tmp = JSON.parse(localStorage.getItem('tasks'));
            setTaskList(tmp);
        }
    },[]
)

    return(
        <>
        
        <div className="container">
            <div className="to-do-list">
                <h2>To Do List</h2>
                <div className="input-field">
                    <input type="text" placeholder="Task Name" value={task} onChange={(e)=>setTask(e.target.value)}></input>
                    <button disabled={!task} onClick={onTaskClick}>Add to list</button>
                </div>

                <h2 className='text'>List of task(s)</h2>
                <div className="list">
                  {
                    taskList.length === 0 ? (<p>No task available</p> ):(
                        taskList.map((ele, index) => {
                            return(
                                <div className="element">
                                    <div className="task">            
                                    <i onClick={() => setTaskChecked(index)} className={`fa-regular ${ele.status ? 'fa-circle-check' : 'fa-circle'}`} title="Mark Completed"></i>
                                        <p style={ele.status ? {textDecoration:'line-through'} : {textDecoration:'none'}}>{ele.taskName}</p>
                                </div>
                                <i onClick={() =>deleteTask(index)} className="fa-solid fa-trash delete" title='Delete task' ></i>
                                </div>
                            )
                        })
                  )}
                  
                     </div>
            </div>
        </div>
        </>
    )
}