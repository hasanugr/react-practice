import { useState } from "react";
import { COLOR_CODES } from "../Config";
import { useDispatch, useSelector } from "react-redux";
import { addNoteAsync } from "../redux/notes/services";
import Loading from "./Loading";
import Error from "./Error";

function ContentForm() {
  const dispatch = useDispatch();
  const [noteText, setNoteText] = useState("");
  const [selectedColerCode, setSelectedColerCode] = useState("1");

  const isLoading = useSelector((state) => state.notes.addNewNote.isLoading);
  const error = useSelector((state) => state.notes.addNewNote.error);

  const handleAddNote = async () => {
    if (noteText) {
      await dispatch(
        addNoteAsync({ title: noteText, colorId: selectedColerCode })
      );
      setNoteText("");
    }
  };

  return (
    <main>
      <div className="mb-3 text-center">
        <div className="form-floating mt-3">
          <textarea
            className="form-control"
            placeholder="Enter your note here..."
            id="floatingTextarea"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            disabled={isLoading}
           />
          <label htmlFor="floatingTextarea">Enter your note here...</label>
          {isLoading && <Loading />}
          {error && <Error message={error} />}
        </div>
      </div>

      <div className="row mb-3 text-center">
        <div className="col-9" style={{ textAlign: "left" }}>
          {COLOR_CODES.map((color) => (
            <button
              key={color.id}
              className={`btn color-button ${
                color.id === selectedColerCode && "selected"
              }`}
              style={{
                backgroundColor: color.code,
                boxShadow:
                  color.id === selectedColerCode
                    ? `0 0 0 0.4rem ${color.code}77`
                    : "0 0 0 0 #ffffff",
              }}
              onClick={() => setSelectedColerCode(color.id)}
            />
          ))}
        </div>

        <div className="col-3">
          <button className="btn button-add" onClick={() => handleAddNote()}>
            ADD
          </button>
        </div>
      </div>
    </main>
  );
}

export default ContentForm;
