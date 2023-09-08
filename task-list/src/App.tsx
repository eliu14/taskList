import React, { useState } from 'react';
import './App.css';
import InputField from "./components/inputField";
import { Todo } from './components/model';
import TodoList from './components/TodoList';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault(); /*Prevents form submit button from auto refreshing after clicking "Go"*/
    if (todo){ /* TODO finish up this function */
      setTodos([...todos, {id: Date.now(), todo: todo, isDone: false}]);
      setTodo("");
    }
  };

  console.log(todos);

  return (
    <div className="App">
      <span className="heading">Task Manager</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos}/>
    </div>
  );
}

export default App;
