import React, { useState } from "react";
import "./SearchEngine.css";
import axios from "axios";
import Results from "./Results";

export default function SearchEngine() {
  let [keyword, setKeyword] = useState(null);
  let [results, setResults] = useState(null);

  function handleResponse(response) {
    setResults(response.data[0]);
  }
  function handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;
    axios.get(url).then(handleResponse);
  }

  function updateKeyword(event) {
    setKeyword(event.target.value);
  }
  return (
    <div className="SearchEngine">
      <section>
        <h1>What word do you want to look up?</h1>
        <form onSubmit={handleSubmit}>
          <input type="search" onChange={updateKeyword} />
        </form>
        <div className="hint">i.e. sea, wine, coding, umbrella</div>
      </section>
      <Results results={results} />
    </div>
  );
}
