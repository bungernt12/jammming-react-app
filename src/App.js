import logo from "./logo.svg";
import "./App.css";
import Playlist from "./Components/Playlist/Playlist";
import SearchResults from "./Components/SearchResults/SearchResults";
import { useState } from "react";

function App() {
  const [resultsList, setResultsList] = useState([
    {
      songName: "All My Days",
      artist: "Alexi Murdoch",
      album: "Tague Greatest Hits",
      id: "0",
    },
    {
      songName: "Mr. Brightside",
      artist: "The Killers",
      album: "Some Album",
      id: "1",
    },
  ]);

  const [playlistTitle, setPlaylistTitle] = useState("Tague's Boppin Playlist");

  const [playlist, setPlaylist] = useState([]);

  //This will be called when the plus button of track is clicked
  function handleAddToPlaylist(trackObj) {
    setPlaylist((prev) => [...prev, trackObj]);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>test123</p>
      </header>
      <div className="body">
        <button>Search</button>
        <SearchResults
          resultsList={resultsList}
          handleAddToPlaylist={handleAddToPlaylist}
        />
        <Playlist playlist={playlist} playlistTitle={playlistTitle} />
        <button>Save To Spotify</button>
      </div>
    </div>
  );
}

export default App;
