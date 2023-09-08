import React, { useState } from 'react';
import './App.css';
import InputField from "./components/inputField";
import { Todo } from './components/model';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault(); /*Prevents form submit button from auto refreshing after clicking "Go"*/
    if (todo){ /* TODO finish up this function */
      setTodos([...todos, {id: Date.now(), todo: todo, isDone: false}]);
      setTodo("");
    }
  };

  const onDragEnd = (result:DropResult) => {
    const {source, destination} = result;

    if(!destination) return;
    if(destination.droppableId === source.droppableId && destination.index===source.index)
      return;

    let add, active = todos, complete=completedTodos;
    console.log("add :" + add);
    console.log("active:" + active)
    console.log("complete: " + complete)
    // Remove from source list 
    if (source.droppableId==="TodosList"){ // from todo list
      add = active[source.index];
      active.splice(source.index,1);
    }
    else { // from completed list
      add = complete[source.index];
      complete.splice(source.index, 1);
    }
    
    //Add to destination list
    if (destination.droppableId==="TodosList"){ // from todo list
      active.splice(destination.index, 0, add);
    }
    else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Task Manager</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList todos={todos} setTodos={setTodos}
          completedTodos = {completedTodos} setCompletedTodos={setCompletedTodos}
        />

      </div>
    </DragDropContext>
  );
}

export default App;
