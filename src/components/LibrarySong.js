import React from 'react';
const LibrarySong = ({ song, currentSongRef, setSongs, songs, setcurrentSong, id, setisPlaying, isPlaying }) => {

    const songClickHandler = async () => {
        // const selectedSong = songs.filter(state => state.id === id)
        await setcurrentSong(song)
        const newSongs = songs.map(song => {
            if (song.id === id) {
                return {
                    ...song,
                    active: true
                }
            } else {
                return {
                    ...song,
                    active: false
                }
            }
        })
        setSongs(newSongs)
        if (isPlaying) currentSongRef.current.play()

    }
    return (
        <div onClick={songClickHandler} className={`library-song ${song.active ? 'selected' : ''}`}>
            <img alt={song.name} src={song.cover} />
            <div className='song-description'>
                <h3> {song.name}</h3>
                <h4> {song.artist}</h4>
            </div>
        </div>
    )
}

export default LibrarySong;