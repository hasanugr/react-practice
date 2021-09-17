import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectFilteredTodos } from "../redux/todos/todosSlice";
import {
  toggleTodoAsync,
  removeTodoAsync,
  getTodosAsync,
} from "../redux/todos/services";
import Loading from "./Loading";
import Error from "./Error";

function TodoList() {
  const dispatch = useDispatch();
  const filteredTodos = useSelector(selectFilteredTodos);
  const isLoading = useSelector((state) => state.todos.isLoading);
  const error = useSelector((state) => state.todos.error);

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  const handleDestroy = async (itemId) => {
    if (window.confirm("Are you sure?")) {
      await dispatch(removeTodoAsync(itemId));
    }
  };

  const handleToggle = async (id, isCompleted) => {
    await dispatch(toggleTodoAsync({ id, data: { isCompleted } }));
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <ul className="todo-list">
      {filteredTodos.map((item) => (
        <li key={item.id} className={item.isCompleted ? "completed" : ""}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={item.isCompleted}
              onChange={() => handleToggle(item.id, !item.isCompleted)}
            />
            <label>{item.title}</label>
            <button
              className="destroy"
              onClick={() => handleDestroy(item.id)}
            ></button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
