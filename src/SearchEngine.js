import React, { useState } from "react";
import "./SearchEngine.css";
import axios from "axios";
import Results from "./Results";
import Photos from "./Photos";

export default function SearchEngine() {
  let [keyword, setKeyword] = useState(null);
  let [results, setResults] = useState(null);
  let [photos, setPhotos] = useState(null);

  function handleResponse(response) {
    setResults(response.data[0]);
  }
  function handlePexelsResponse(response) {
    setPhotos(response.data.photos);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;
    axios.get(url).then(handleResponse);

    let pexelsApiKey =
      "563492ad6f9170000100000141e5f2d692f54161b9c2494b5f06ac06";
    let pexelsApiUrl = `https://api.pexels.com/v1/search?query=${keyword}&per_page=9`;
    let headers = {
      Authorization: `Bearer ${pexelsApiKey}`,
    };
    axios.get(pexelsApiUrl, { headers: headers }).then(handlePexelsResponse);
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
      <Photos photos={photos} />
    </div>
  );
}
