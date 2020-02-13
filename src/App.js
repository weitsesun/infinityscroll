import React, { useState, useRef, useCallback } from 'react';
import uuidv4 from 'uuid/v4';
import useBookSearch from './useBookSearch'

function App() {
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const {
    books,
    hasMore,
    error,
    loading,
  } = useBookSearch(query, pageNumber)

  const observer = useRef() //default is null
  const lastBookElementRef = useCallback(node => {
    if(loading) return;
    if(observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if(node) observer.current.observe(node)
  }, [hasMore, loading])

  function handleSearch(e) {
    setQuery(e.target.value)
    setPageNumber(1)
  }

  

  return (
    <div>
      <input type="text" value={query} onChange={handleSearch}></input>
      {books.map((title, index) => {
        if(index === books.length - 1) {
          return <div ref={lastBookElementRef} key={uuidv4()}>{title}</div>
        }
        return <div key={uuidv4()}>{title}</div>
      })}
      <div>{loading && 'loading...'}</div>
      <div>{error && 'ERROR'}</div>
    </div>
  );
}



export default App;
