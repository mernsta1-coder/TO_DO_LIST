import React from 'react'
import './Todo.css'
import { useState,useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';



const Todo = () => {
    const [todo,settodo] = useState("");
    const [todos,settodos] = useState([]);
     const firstRender = useRef(true);

    
    useEffect(()=> {
      let toString = localStorage.getItem("todos");

      if(toString){
        let arraytodos = JSON.parse(toString);
        settodos(arraytodos)
        
      }

    },[])
     const handleKeyDown = (e) =>{
      
      if(e.key === "Enter"){
        e.preventDefault();
        handleSave();
      }
     }


  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

   const handleEdit = (id) => {
  let t = todos.filter(i => i.id === id);
  settodo(t[0].todo);
  settodos(todos.filter(item => item.id !== id));
  // savetOLS();
};
const savetOLS = () =>{
  localStorage.setItem("todos", JSON.stringify(todos));
}

    const handleSave = (e) =>{
        settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
        settodo("")

        }
    
    const handleDelete = (id) =>{
        let newtodos = todos.filter(item => item.id !== id);
        settodos(newtodos);
    }
    const handleChange = (e)=>{
        settodo(e.target.value)

    }
   const checkbox = (e) => {
  const id = e.target.name; // or e.target.id if you set id on input
  const index = todos.findIndex(item => item.id === id);
  let newtodos = [...todos];
  newtodos[index].isCompleted =! newtodos[index].isCompleted;
  settodos(newtodos);

};

  return (
    <div className='Background'>
        <h2>Add a Todo</h2>
        <div className='container1'>
        <input type='text' value={todo} onChange={handleChange} onKeyDown={handleKeyDown} placeholder='Enter a Todo'/>
        <input type='button' value="save" onClick={handleSave} className='btn1'/>
        </div>
        <h3>Your Todo</h3>
       
  {todos.map((item,index) => (
  <div key={item.id} className={item.isCompleted ? "line-through" : "no-line"}>
    <div className='displayitems'>
        <input 
        name={item.id}
      type="checkbox" 
      checked={item.isCompleted} 
      onChange={(e)=> checkbox(e)} 
    /><div className='item1'>
    {item.todo}</div>
    <div className='button'>
    <input type="button" value="Edit" onClick={() => handleEdit(item.id)} className='item3'  />
    <input type="button" value="Delete" onClick={() => handleDelete(item.id)} className='item2' />
  </div>
  </div>
  </div>
))}

    </div>
    

       
      
  )
}

export default Todo