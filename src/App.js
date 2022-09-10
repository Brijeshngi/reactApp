import React, { useState, useEffect } from 'react'

const App = () => {
  
  const [todo, setTodo] = useState("") // initial state
  const[filterObj,setFilterObj]=useState("")
  console.log("updateddddd",todo)
  const [todos, setTodos] = useState([]) //array to store todos

  console.log("todos List", todos)
  const [id, setId] = useState(""); //here id is fetched out

  const [modeEdit, setModeEdit] = useState(false)
  console.log("mode status", modeEdit)

  const handleDelete=()=>{
    console.log("Delete Clicked")

  }

  const handleSubmit=e=>{
    e.preventDefault();
   if(modeEdit){
    setTodos([{id:`${Date.now()}`,todo}, ...todos])
    setModeEdit(false)
    setTodo("")
   }
   else{
    if(todo!==''){
      setTodos([{id:`${Date.now()}`,todo}, ...todos])
        setTodo("")
    }
   }
  //  setModeEdit(false)
  }
  const Edit=(id,todo)=>{
    console.log("Clicked",id,todo)
    setModeEdit(true)
    const filtredArray = todos.filter(i=>i.id===id)
    
    if(filtredArray){
      setFilterObj(filtredArray[0].id)
      setTodo(filtredArray[0].todo)
    }

    console.log("isTrue",filtredArray[0])

   


  }

  return (
  <React.Fragment >
    <h1 className="mx-5">Task Tracker</h1>
    <div className="input-group mb-3">
      
    <input type="text" value={todo} onChange={(e)=>setTodo(e.target.value)}
    className="form-control mx-5" 
    placeholder=" Start adding your task here"/>  
    {modeEdit?<button type="submit" onClick={(e)=>handleSubmit(e)} className="btn btn-primary mx-5">Update</button>:<button type="submit" onClick={(e)=>handleSubmit(e)} className="btn btn-primary mx-5">Add Task</button>} 
      
    
    </div>

    <div className='d-flex flex-row'>

          <ul>
            {modeEdit? todos.filter(id=>id.id!==filterObj).map((t)=>(
            <li className="p-4 mb-2 bg-info text-white m-3 mx-3 ">{t.todo}
            <button onClick={()=>Edit(t.id,t.todo)} className="m-4 btn btn-primary mx-2">Edit</button>
            <button onClick={handleDelete}className="m-4 btn btn-danger mx-2 ">Delete</button>
            </li>
            )):todos.filter(id=>id.id!==filterObj).map((t)=>(
              <li className="p-4 mb-2 bg-info text-white m-3 mx-3 ">{t.todo}
              <button onClick={()=>Edit(t.id,t.todo)} className="m-4 btn btn-primary mx-2">Edit</button>
              <button onClick={handleDelete}className="m-4 btn btn-danger mx-2 ">Delete</button>
              </li>))}
            
          </ul>
      

    </div>
    </React.Fragment>
  )
}

export default App