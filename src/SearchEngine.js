import React, { useState } from "react";
import "./SearchEngine.css";
import axios from "axios";

export default function SearchEngine() {
  let [keyword, setKeyword] = useState(null);

  function handleResponse(response) {
    console.log(response.data);
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
      <form onSubmit={handleSubmit}>
        <input type="search" onChange={updateKeyword} />
      </form>
    </div>
  );
}
