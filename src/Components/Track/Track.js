import React from "react";
import styles from "./Track.module.css";
// import { useState } from "react";
import playButton from "../../resources/play-button.svg";

function Track(props) {
  return (
    // This is not working right now. I don't see a border.
    <div className={styles.trackBox}>
      <div className={styles.trackText}>
        <h3 className={styles.songName}>Song: {props.trackInfo.songName}</h3>
        <p>
          {props.trackInfo.artist} | {props.trackInfo.album}
        </p>
      </div>

      {/* trying to only add + buttons if the track components are being rendered
      in the results list section and - button if its rendered in the playlist section.
      Also trying to re-enable button of the same track when - button is clicked. */}
      <div className={styles.trackButtons}>
        <img src={playButton} alt="play-button" className={styles.playButton} />
        {props.trackInPlaylist ? (
          <button
            className={styles.button}
            onClick={() => {
              props.handleRemoveFromPlaylist(props.trackInfo);
            }}
          >
            -
          </button>
        ) : (
          <button
            className={styles.button}
            onClick={() => {
              props.handleAddToPlaylist(props.trackInfo);
            }}
          >
            +
          </button>
        )}
      </div>
    </div>
  );
}

export default Track;
