import React from 'react';
import styles from './Track.module.css';

function Track(props) {
    return (
        // This is not working right now. I don't see a border.
        <div className={styles.trackBox}>
            <p>Song: {props.trackInfo.songName}</p>
            <p>Artist: {props.trackInfo.artist}</p>
            <p>Album: {props.trackInfo.album}</p>
        </div>
    )
};

export default Track;