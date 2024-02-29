import "./App.css";
import Playlist from "./Components/Playlist/Playlist";
import SearchResults from "./Components/SearchResults/SearchResults";
import { useState } from "react";
import Spotify from "./Spotify";

function App() {
  const [resultsList, setResultsList] = useState([]);

  const [playlistTitle, setPlaylistTitle] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [searchValue, setSearchVaue] = useState("");

  function handleInputChange(e) {
    setSearchVaue(e.target.value);
  }

  async function handleSearch(e) {
    e.preventDefault();
    const adjustedResultsArray = await Spotify.search(searchValue);
    setResultsList(adjustedResultsArray);
  }

  //This will be called when the plus button of track is clicked
  function handleAddToPlaylist(trackObj) {
    if (!playlist.includes(trackObj)) {
      setPlaylist((prev) => [...prev, trackObj]);
    }
  }

  function handleRemoveFromPlaylist(trackObj) {
    setPlaylist((prev) =>
      prev.filter((currentTrackObj) => currentTrackObj !== trackObj)
    );
  }

  function handleSubmit() {
    const uriArray = [];
    playlist.forEach((trackObj) => uriArray.push(trackObj.uri));
    console.log(uriArray);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify Playlist Creator</h1>
      </header>
      <div className="body">
        <form onSubmit={handleSearch}>
          <input onChange={handleInputChange} placeholder="Song Search" />
          <button>Search</button>
        </form>
        <button className="submitButton" onClick={Spotify.createPlaylist}>
          Save To Spotify
        </button>
        <div className="lists">
          <SearchResults
            resultsList={resultsList}
            handleAddToPlaylist={handleAddToPlaylist}
          />
          {/* <Spotify setResultsList={setResultsList} /> */}
          <Playlist
            playlist={playlist}
            playlistTitle={playlistTitle}
            setPlaylistTitle={setPlaylistTitle}
            handleRemoveFromPlaylist={handleRemoveFromPlaylist}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
