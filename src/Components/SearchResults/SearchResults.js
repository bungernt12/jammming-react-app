import React from "react";
import Tracklist from "../Tracklist/Tracklist";

function SearchResults({ resultsList, handleAddToPlaylist }) {
  return (
    <div>
      <p>Search Results</p>
      <Tracklist
        tracklist={resultsList}
        handleAddToPlaylist={handleAddToPlaylist}
      />
    </div>
  );
}

export default SearchResults;
