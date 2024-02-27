import React from "react";
import styles from "./Track.module.css";

function Track(props) {
  return (
    // This is not working right now. I don't see a border.
    <div className={styles.trackBox}>
      <p>Song: {props.trackInfo.songName}</p>
      <p>Artist: {props.trackInfo.artist}</p>
      <p>Album: {props.trackInfo.album}</p>

      {/* trying to only add buttons if the track components are being rendered
      in the results list section */}
      {props.trackInPlaylist ? (
        ""
      ) : (
        <button onClick={() => props.handleAddToPlaylist(props.trackInfo)}>
          Add To Playlist
        </button>
      )}
    </div>
  );
}

export default Track;
