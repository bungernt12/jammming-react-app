import React from "react";
import Tracklist from "../Tracklist/Tracklist";
import styles from "./SearchResults.module.css";

function SearchResults({ resultsList, handleAddToPlaylist }) {
  return (
    <div className={styles.resultsList}>
      <h2>Search Results</h2>
      <hr width="90%"></hr>
      <Tracklist
        tracklist={resultsList}
        handleAddToPlaylist={handleAddToPlaylist}
        key={0}
      />
    </div>
  );
}

export default SearchResults;
