import React from "react";
import Tracklist from "../Tracklist/Tracklist";

function Playlist({ playlistTitle, playlist }) {
  return (
    <div>
      <p>{playlistTitle}</p>
      <Tracklist tracklist={playlist} trackInPlaylist={true} />
    </div>
  );
}

export default Playlist;
