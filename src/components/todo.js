import React from 'react'
import {useState,useRef,useEffect} from 'react';
const TodoCard = ({}) => {
  
  const[list,setList] = useState([]);
  const[todo,setTodo] = useState("");
  const[elementToEdit,setElementToEdit] = useState({
    element : "",
    idx : ""
  });
  const [editValue,setEditValue] = useState("");
  const searchRef = useRef();
  const createTodo = (e) => {
    e.preventDefault();
    console.log(e);
    const todo = searchRef.current.value;
    console.log(todo);
     setTodo(todo);
     e.target[0].value = "";
     console.log(e.target[0].value);
  }
  useEffect(()=> {
    if(todo){
      setList(curList => {
        console.log([...curList,todo]);
          return [...curList,todo];
       })
    }
    },[todo])

  const editTodo = (idx,elem) => {
    setElementToEdit({
      element : elem,
      id : idx
    })
        
    }
 
  const deleteTodo = (idx) => {
    console.log("delete");
    const filteredList = list.filter((elem,id) => {
      return id != idx;
    } );
    setList(filteredList);
         console.log(list)
  }

  const updateElement = () => {
       const updatedList = list 
         updatedList[elementToEdit.id] = editValue;
       setList(updatedList);
       setElementToEdit({
        element : "",
        idx : ""
      })
    console.log(list);
  }
  return (
    <div className='todo-container'>
     <form onSubmit={createTodo}>
     <input type="text" name="search" placeholeder="search" id="search" ref={searchRef}/>
     <button type='submit'>Add</button>
     </form>
     { elementToEdit.element && 
        (<div>
          <input type='text' name="todo" defaultValue={elementToEdit.element} onKeyUp={(e) => setEditValue(e.target.value)}/>
          <button onClick={updateElement}>update</button>
        </div>)
        }
        <div className='todo-container'>
     {list.map((elem,idx) => {
             return(
                
             <tr>
                <td>
                  <input type="checkbox"/>
                </td>
                <td>
                  <p>{elem}</p>
                </td>
                <td>
                  <button onClick={() => editTodo(idx,elem)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => deleteTodo(idx)}>delete</button> 
                </td>
             </tr>                      
        
      )
    })
   }
    </div>
   
  </div>
  )
}

export default TodoCard