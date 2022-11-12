import { useRef } from "react";

function Search(_props) {
  const inputRef = useRef();

  return (
    <div>
      <h3>Search for a movie</h3>
      <form>
        <input
          id="search"
          type="text"
          placeholder="Write the movie name"
          ref={inputRef}
          required
        />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            inputRef.current.focus();
          }}
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default Search;
