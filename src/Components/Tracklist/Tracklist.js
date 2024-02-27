import React from "react";
import Track from "../Track/Track";

function Tracklist({ tracklist, handleAddToPlaylist, trackInPlaylist }) {
  return (
    <div id="trackListDiv">
      <p>Tracklist component</p>
      {tracklist.length > 0 ? (
        tracklist.map((trackObj, index) => {
          return (
            <Track
              trackInfo={trackObj}
              key={index}
              handleAddToPlaylist={handleAddToPlaylist}
              trackInPlaylist={trackInPlaylist}
            />
          );
        })
      ) : (
        <p>Try searching for songs, then add them with the + button</p>
      )}

      {}
      {/* <Track trackInfo={props.trackArray[0]} />
            <Track trackInfo={props.trackArray[1]} /> */}
    </div>
  );
}

export default Tracklist;
