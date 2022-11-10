import { useRef } from "react"

function Search(props) {
    const inputRef = useRef()
    console.log(inputRef.current);
    
  return (
    <div>
        <h3>Search</h3>
      <form>
            <input id='search' type="text" placeholder='Search' ref={inputRef} required/>
            <button type="submit" onClick={() => {
                inputRef.current.focus()
            }}>Search</button>
      </form>
    </div>
  )
}

export default Search
