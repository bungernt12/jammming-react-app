import React from "react";
import Track from "../Track/Track";

function Tracklist({
  tracklist,
  handleAddToPlaylist,
  trackInPlaylist,
  handleRemoveFromPlaylist,
}) {
  return (
    <div id="trackListDiv">
      {tracklist.length > 0 ? (
        tracklist.map((trackObj, index) => {
          return (
            <div key={index}>
              <Track
                trackInfo={trackObj}
                key={index}
                handleAddToPlaylist={handleAddToPlaylist}
                trackInPlaylist={trackInPlaylist}
                handleRemoveFromPlaylist={handleRemoveFromPlaylist}
              />
              <hr width="90%"></hr>
            </div>
          );
        })
      ) : (
        <div>
          <p>Search for songs above</p>
          <p>Add them with the + button</p>
        </div>
      )}

      {}
      {/* <Track trackInfo={props.trackArray[0]} />
            <Track trackInfo={props.trackArray[1]} /> */}
    </div>
  );
}

export default Tracklist;
