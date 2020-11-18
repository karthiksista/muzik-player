import React from 'react'
import LibrarySong from './LibrarySong'

const Library = ({ songs, currentSong, setSongs, currentSongRef, setcurrentSong, isPlaying, setisPlaying, libraryStatus }) => {
    return (
        <div className={`library ${libraryStatus ? "active-library" : " "}`}>
            <h2> Library</h2>
            <div className='library-songs'>
                {songs.map(song => (
                    <LibrarySong currentSong={currentSong} songs={songs} song={song} setcurrentSong={setcurrentSong}
                        id={song.id}
                        key={song.id}
                        setisPlaying={setisPlaying}
                        isPlaying={isPlaying}
                        currentSongRef={currentSongRef}
                        setSongs={setSongs}

                    />
                )
                )}
            </div>
        </div>
    )
}

export default Library
