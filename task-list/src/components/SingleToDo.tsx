import React from 'react'
import { Todo } from './model';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import './styles.css';

type Props = {
   todo: Todo;
   key: number;
   todos: Todo[];
   setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;

}

const SingleToDo = ({todo, key, todos, setTodos}: Props) => {
  return (<form className="todos_single">
   <span className="todos_single--text">{todo.todo}</span>
   <div>
      <span className="icon">
         <AiFillEdit />
      </span>
      <span className="icon">
         <AiFillDelete />
      </span>
      <span className="icon">
         <MdDone />
      </span>
   </div>
  </form>
  );
}

export default SingleToDo