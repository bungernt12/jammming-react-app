import React from 'react'
import Track from '../Track/Track'

function Tracklist({trackArray}) {
    return (
        <div id='trackListDiv'>
            {trackArray.map((trackObj, index) => {
                return <Track trackInfo={trackObj} key={index} />
            })}
            {/* <Track trackInfo={props.trackArray[0]} />
            <Track trackInfo={props.trackArray[1]} /> */}
        </div>
    )
};

export default Tracklist;