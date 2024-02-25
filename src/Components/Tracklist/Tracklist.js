import React from 'react'
import Track from '../Track/Track'

function Tracklist(props) {
    return (
        <div>
            <Track trackInfo={props.trackArray[0]} />
            <Track trackInfo={props.trackArray[1]} />
        </div>
    )
};

export default Tracklist;