import { useState } from "react";

function ContentFilter() {
  const [filteredText, setFilteredText] = useState("");

  return (
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
  );
}

export default ContentFilter;
