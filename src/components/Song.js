import React from 'react';

const Song = ({ name, artist, cover }) => {
    return (
        <div className='song-container'>
            <img src={cover} />
            <h2> {name}</h2>
            <h3> {artist}</h3>
        </div>
    )
}

export default Song;