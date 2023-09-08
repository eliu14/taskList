import React, { useEffect, useRef, useState } from 'react'
import { Todo } from './model';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import './styles.css';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
   index: number;
   todo: Todo;
   todos: Todo[];
   setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;

}

const SingleToDo = ({index, todo, todos, setTodos}: Props) => {
   const [edit, setEdit] = useState<boolean>(false);
   const [editTodo, setEditTodo] = useState<string>(todo.todo);
   
   const handleDone = (id: number) => {
   setTodos(
      todos.map((todo)=> 
         todo.id===id ? {...todo, isDone: !todo.isDone} : todo
      )
   );
  };
  
  const handleDelete = (id: number) => {
   setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (e:React.FormEvent, id: number) => {
      e.preventDefault()

      setTodos(todos.map((todo) => (
         todo.id===id?{...todo,todo:editTodo}:todo
      )));
      setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus()
  }, [edit]);

  return (
   <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
         <form 
            className={`todos_single ${snapshot.isDragging?'drag': ""}`}
            onSubmit={(e)=>handleEdit(e, todo.id)}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
         >
            {edit ? 
               (<input 
                  ref={inputRef}
                  value={editTodo} 
                  onChange={(e) => setEditTodo(e.target.value)}
                  className="todos_single--text"
                  />
            ) : todo.isDone ? (
               <s className="todos_single--text">{todo.todo}</s>
            ): (
               <span className="todos_single--text">{todo.todo}</span>
            )
            }
            <div>
               <span 
                  className="icon" 
                  onClick={() => {
                     if(!edit && !todo.isDone) {
                        setEdit(!edit);
                     }
                  }}
               >
                  <AiFillEdit />
               </span>
               <span className="icon" onClick={() => handleDelete(todo.id)}>
                  <AiFillDelete />
               </span>
               <span className="icon" onClick={() => handleDone(todo.id)}>
                  <MdDone />
               </span>
            </div>
         </form>
         )}
   </Draggable>
  );
}

export default SingleToDo