import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateContact } from "../../redux/contactSlice";

function EditForm({ contact }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState(contact.name);
  const [number, setNumber] = useState(contact.phone_number);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !number) return false;

    dispatch(
      updateContact({
        id: contact.id,
        changes: {
          name: name,
          phone_number: number,
        },
      })
    );

    history.goBack();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Phone Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <div className="btn">
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
}

export default EditForm;
