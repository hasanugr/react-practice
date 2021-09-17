import { useEffect, useState } from "react";
import { GetColorById } from "../Config";
import { useSelector, useDispatch } from "react-redux";
import { selectNotes } from "../redux/notes/notesSlice";
import { getNotesAsync, removeNoteAsync } from "../redux/notes/services";
import Loading from "./Loading";
import Error from "./Error";

function ContentList() {
  const dispatch = useDispatch();
  const notes = useSelector(selectNotes);
  const isLoading = useSelector((state) => state.notes.isLoading);
  const error = useSelector((state) => state.notes.error);
  const [filteredText, setFilteredText] = useState("");

  useEffect(() => {
    dispatch(getNotesAsync());
  }, [dispatch]);

  const handleDeleteNote = async (id) => {
    await dispatch(removeNoteAsync(id));
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  let filteredNotes = notes;
  if (filteredText) {
    filteredNotes = notes.filter((note) =>
      note.title.toLowerCase().includes(filteredText.toLowerCase())
    );
  }

  return (
    <>
      <div className="form-floating mt-5 mb-3 mx-auto" style={{ width: 250 }}>
        <input
          type="text"
          className="form-control filter-input"
          id="floatingInput"
          placeholder="Search.."
          value={filteredText}
          onChange={(e) => setFilteredText(e.target.value)}
        />
        <label htmlFor="floatingInput">Search..</label>
      </div>
      <div className="row">
        {filteredNotes.map((note) => (
          <div key={note.id} className="col-12">
            <div
              className="card my-1"
              style={{ backgroundColor: GetColorById(note.colorId) }}
            >
              <p>{note.title}</p>
              <button
                className="btn delete-button"
                onClick={() => handleDeleteNote(note.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                  <path
                    fillRule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ContentList;
