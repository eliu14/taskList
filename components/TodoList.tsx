import React from 'react';
import '../dist/styles.css';
import { Todo } from './model';
import SingleToDo from './SingleToDo';
import {Droppable} from 'react-beautiful-dnd';
interface Props {
   todos: Todo[];
   setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
   completedTodos: Todo[];
   setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({todos, setTodos, completedTodos, setCompletedTodos}: Props) => {
  return (
   <div className="container">
      <Droppable droppableId="TodosList">
         {(provided, snapshot) => (
            <div 
               className={`todos ${snapshot.isDraggingOver?'dragactive':""}`}
               ref={provided.innerRef} 
               {...provided.droppableProps}
            >
               <span className="todos_heading">
                  Active Tasks
               </span>
               {todos.map((todo, index) => (
                     <SingleToDo 
                        index={index}
                        todo={todo} 
                        todos={todos}
                        setTodos={setTodos} 
                     />
               ))}
               {provided.placeholder}
            </div>
            )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
         {(provided, snapshot) => (
            <div 
               className={`todos remove ${snapshot.isDraggingOver?'dragcomplete':""}`}
               ref={provided.innerRef} 
               {...provided.droppableProps}
            >
               <span className="todos_heading">
               Completed Tasks
               </span>
               {completedTodos.map((todo, index) => (
                     <SingleToDo 
                        index={index}
                        todo={todo} 
                        todos={completedTodos}
                        setTodos={setCompletedTodos} 
                     />
                  ))
               }
               {provided.placeholder}
            </div>
         )}
      </Droppable>
   </div>
  );
};

export default TodoList