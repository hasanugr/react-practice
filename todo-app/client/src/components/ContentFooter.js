import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changeActiveFilter,
  selectActiveFilter,
  selectTodos,
} from "../redux/todos/todosSlice";
import { removeCompletedTodosAsync } from "../redux/todos/services";

function ContentFooter() {
  const dispatch = useDispatch();
  const items = useSelector(selectTodos);
  const itemsLeft = items.filter((item) => !item.isCompleted).length;

  const activeFilter = useSelector(selectActiveFilter);

  const handleClearCompletedTodos = async () => {
    let completedIds = [];
    items.map((item) => {
      if (item.isCompleted) {
        completedIds.push(item.id);
      }
    });
    await dispatch(removeCompletedTodosAsync({ ids: completedIds }));
  };

  useEffect(() => {
    localStorage.setItem("activeFilter", activeFilter);
  }, [activeFilter]);

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{itemsLeft}</strong> item{itemsLeft > 1 && "s"} left
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={activeFilter === "all" ? "selected" : ""}
            onClick={() => dispatch(changeActiveFilter("all"))}
          >
            All
          </a>
        </li>
        <li>
          <a
            href="#/"
            className={activeFilter === "active" ? "selected" : ""}
            onClick={() => dispatch(changeActiveFilter("active"))}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="#/"
            className={activeFilter === "completed" ? "selected" : ""}
            onClick={() => dispatch(changeActiveFilter("completed"))}
          >
            Completed
          </a>
        </li>
      </ul>

      <button
        className="clear-completed"
        onClick={() => handleClearCompletedTodos()}
      >
        Clear completed
      </button>
    </footer>
  );
}

export default ContentFooter;
