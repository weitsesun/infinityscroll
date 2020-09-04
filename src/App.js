import React, { useState, useRef, useCallback } from "react";

import "./styles/App.css";
import useBookSearch from "./useBookSearch";
import Loading from "./Loading";

function App() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setPageNumber(1);
  };

  const { error, hasMore, books, loading } = useBookSearch(query, pageNumber);

  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="screen">
      <input
        className="input"
        placeholder="Search books here"
        type="text"
        value={query}
        onChange={(e) => handleSearch(e)}
      />
      <div>
        {books.map((book, idx) => {
          if (idx + 1 !== books.length) {
            return (
              <div key={book} className="title">
                {book}
              </div>
            );
          } else {
            return (
              <div key={book} ref={lastBookElementRef} className="title">
                {book}
              </div>
            );
          }
        })}
      </div>
      {loading ? <Loading /> : null}
      {error ? <div>ERROR</div> : null}
    </div>
  );
}

export default App;
