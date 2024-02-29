import React from "react";
import Tracklist from "../Tracklist/Tracklist";
import styles from "./Playlist.module.css";

function Playlist({
  playlistTitle,
  playlist,
  setPlaylistTitle,
  handleRemoveFromPlaylist,
}) {
  function handleInputChange(e) {
    setPlaylistTitle(e.target.value);
  }

  return (
    <div className={styles.playlist}>
      <form>
        <input
          placeholder="Name Your Playlist!"
          onChange={handleInputChange}
          value={playlistTitle}
        ></input>
      </form>
      <hr width="90%" />
      <Tracklist
        tracklist={playlist}
        trackInPlaylist={true}
        handleRemoveFromPlaylist={handleRemoveFromPlaylist}
        key={1}
      />
    </div>
  );
}

export default Playlist;
