import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteContact } from "../../redux/contactSlice";

function Item({ item }) {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteContact(id));
    }
  };

  return (
    <li>
      <span>{item.name}</span>
      <span>{item.phone_number}</span>
      <div className="edit">
        <span>
          <Link to={`/edit/${item.id}`}>Edit</Link>
        </span>
        <span className="deleteBtn" onClick={(e) => handleDelete(item.id)}>
          x
        </span>
      </div>
    </li>
  );
}

export default Item;
