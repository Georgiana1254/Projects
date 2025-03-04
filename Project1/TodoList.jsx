import {TodoItem} from "./TodoItem"

export function TodoList({ todos, toggleTodo, deleteTodo}) {
    return (
      <div>
        {todos.length === 0 && <p>No Todos</p>}
  
        <ul className="list">
          {todos.map(todo => (
            <TodoItem
            {...todo}
              key={todo.id}
              toggleTodo = {toggleTodo}
              deleteTodo ={deleteTodo}
            />
          ))}
        </ul>
      </div>
    );
  }
  