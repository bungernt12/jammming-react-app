import "./App.css";
import Playlist from "./Components/Playlist/Playlist";
import SearchResults from "./Components/SearchResults/SearchResults";
import { useState } from "react";
import Spotify from "./Spotify";
import { useEffect } from "react";

function App() {
  const [resultsList, setResultsList] = useState([]);

  const [playlistTitle, setPlaylistTitle] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [playlistSaved, setPlaylistSaved] = useState(false);

  //when window is reloaded, the useeffect is called.
  //is useeffect used to stop the mounting from happening several times? so it only happens on the first one?
  //get accesstokenonload does what it says, which will only happen if its in the URL, and if it does do that, it returns the search term.
  //how does it know the search term? it knows the term because getAccessToken takes it as a parameter and puts in the url.
  //getAccessToken gets passed the search term when search is called. thats complicated. I wonder how it can be simplified.
  //for some reason clicking "save playlist to spotify" caused the page to reload, clearing search results/playlist.
  window.onload = useEffect(() => {
    console.log("mounted");
    window.onload = async () => {
      const searchTerm = Spotify.getAccessTokenOnLoad();
      console.log("in on load useeffect", searchTerm);
      if (searchTerm) {
        console.log("in conditional statement");
        setSearchValue(searchTerm);
        const adjustedResultsArray = await Spotify.search(searchTerm);
        setResultsList(adjustedResultsArray);
      }
    };

    return () => {
      console.log("unmounted");
    };
  }, []);

  // for search and playlist title inputs
  function handleInputChange(e) {
    setSearchValue(e.target.value);
  }

  // when search button is clicked
  async function handleSearch() {
    const adjustedResultsArray = await Spotify.search(searchValue);
    setResultsList(adjustedResultsArray);
  }

  //This will be called when the plus button of track is clicked
  function handleAddToPlaylist(trackObj) {
    if (!playlist.includes(trackObj)) {
      setPlaylist((prev) => [...prev, trackObj]);
    }
  }

  //This will be called when the plus button of track is clicked
  function handleRemoveFromPlaylist(trackObj) {
    setPlaylist((prev) =>
      prev.filter((currentTrackObj) => currentTrackObj !== trackObj)
    );
  }

  //creates uri array, adds to it, then uses method from spotify object
  function handleSavePlaylistToSpotify() {
    const uriArray = [];
    playlist.forEach((trackObj) => uriArray.push(trackObj.uri));
    Spotify.createPlaylist(playlistTitle, uriArray, playlistSaved);
    if (playlistTitle) {
      setPlaylistSaved(true);
    }
  }

  if (false) {
    return;
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify Playlist Creator</h1>
      </header>
      <div className="body">
        <input onChange={handleInputChange} placeholder="Song Search" />
        <button
          onClick={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          Search
        </button>
        <button className="submitButton" onClick={handleSavePlaylistToSpotify}>
          Save Playlist To Spotify
        </button>
        <div className="lists">
          <SearchResults
            resultsList={resultsList}
            handleAddToPlaylist={handleAddToPlaylist}
          />
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
