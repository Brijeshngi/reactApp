import React, { useState } from 'react'
import { ThemeProvider } from 'react-bootstrap'

const App = () => {
  
  const [todo, setTodo] = useState("") // initial state
  
  const[filterObj,setFilterObj]=useState("")  // used here to fetch one element to delete 
  console.log("updateddddd",todo)
  
  const [todos, setTodos] = useState([]) //array to store todos
  console.log("todos List", todos)
  
  

  const [modeEdit, setModeEdit] = useState(false) // set edit mode for add and update button
  console.log("mode status", modeEdit)            // by default it is set to False
  /////////////////////////////////////////////////////////////////////

  
  ////////////////////////////////////////////////////////////////////
  const handleSubmit=e=>{
    e.preventDefault();
   if(modeEdit){
    setTodos([{id:`${Date.now()}`,todo}, ...todos])
    setModeEdit(false)
    setTodo("")// to refresh input field
   }
   else
   {
    if(todo!==''){
      setTodos([{id:`${Date.now()}`,todo}, ...todos])
      setTodo("") // to refresh input field
    }
   }
  
  }
  const Edit=(id,todo)=>{
    console.log("Clicked",id,todo)
    
    setModeEdit(true)             //when edit mode is true then update button shows and you can perform update
    const filtredArray = todos.filter(i=>i.id===id) // test and find id which will be updated
    
    if(filtredArray){             // single object is thrown to input field and updation is performed
      setFilterObj(filtredArray[0].id)
      setTodo(filtredArray[0].todo)
    }

    console.log("isTrue",filtredArray[0])     //testing

    


  }
  const handleDelete=(i)=>{
    console.log("Delete Clicked",i)
   const newTodos = [...todos]

   const deletedTodo = newTodos.splice(i,1)

    console.log("updated deleted", newTodos )
    console.log(deletedTodo)

    setTodos(newTodos)


    // const delTodos = todos.filter(t =>t.id !== id);
    // setTodos([...delTodos])

    // console.log(delTodos);

    
    //const delTodo = todos.filter((to) => to.id !== id)
    //setTodos([...delTodo])
    

  }

  return (
  <React.Fragment >
    <h1 className="mx-5">Task Tracker</h1>
    <div className="input-group mb-3">
      
    <input type="text" value={todo} onChange={(e)=>setTodo(e.target.value)}   //value todo is fetched and updated to input field
    className="form-control mx-5" 
    placeholder=" Start adding your task here"/>  
    {modeEdit?<button type="submit" 
    onClick={(e)=>handleSubmit(e)} 
    className="btn btn-primary mx-5">Update</button>:<button type="submit" onClick={(e)=>handleSubmit(e)} // ?<= true and :<= false
    className="btn btn-primary mx-5">Add Task</button>}                                                    
              
    
    </div>

    <div className='d-flex flex-row'>

          <ul>
            {modeEdit? todos.filter(id=>id.id!==filterObj).map((t,index)=>(                         // modeedit true then it follows
            <li className="p-4 mb-2 bg-info text-white m-3 mx-3 ">{t.todo}                            
            <button onClick={()=>Edit(t.id,t.todo)} className="m-4 btn btn-primary mx-2">Edit</button>
            <button onClick={()=>handleDelete(index)}className="m-4 btn btn-danger mx-2 ">Delete</button>
            </li>
            )):todos.filter(id=>id.id!==filterObj).map((t,index)=>(                                 // modeedit false then it follows
              <li className="p-4 mb-2 bg-info text-white m-3 mx-3 ">{t.todo}
              <button onClick={()=>Edit(t.id,t.todo)} className="m-4 btn btn-primary mx-2">Edit</button>
              <button onClick={()=>handleDelete(index)}className="m-4 btn btn-danger mx-2 ">Delete</button>
              </li>))}
            
          </ul>
      

    </div>
    </React.Fragment>
  )
}

export default App