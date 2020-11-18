import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faForward, faBackward, faPause } from '@fortawesome/free-solid-svg-icons'
const Player = ({ currentSong, songInfo, setcurrentSong, songs, setsongInfo, isPlaying, setisPlaying, setSongs, currentSongRef }) => {

    useEffect(() => {
        const newSongs = songs.map(song => {
            if (song.id === currentSong.id) {
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
    }, [currentSong])
    const getTime = (time) => {
        return (Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2))
    }

    const dragHandler = (e) => {
        currentSongRef.current.currentTime = e.target.value
        setsongInfo({ ...songInfo, currentTime: e.target.value })
    }

    const playHandler = () => {
        setisPlaying(!isPlaying)

        if (!isPlaying) {
            currentSongRef.current.play()
            setisPlaying(!isPlaying)
        } else {
            currentSongRef.current.pause()
            setisPlaying(!isPlaying)
        }
    }

    const skipTrackHandler = async (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if (direction === 'skip-forward') {
            await setcurrentSong(songs[(currentIndex + 1) % songs.length]);
        } if (direction === "skip-back") {
            if ((currentIndex - 1) % songs.length === -1) {
                await setcurrentSong(songs[songs.length - 1]);
                if (isPlaying) currentSongRef.current.play()
                return;
            }
            await setcurrentSong(songs[(currentIndex - 1) % songs.length]);
        }
        if (isPlaying) currentSongRef.current.play()
    }


    return (
        <div className='player'>
            <div className='time-control'>
                <p>{getTime(songInfo.currentTime)}</p>
                <input min={0} max={songInfo.duration || 0} value={songInfo.currentTime} onChange={dragHandler} type='range' />
                <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
            </div>
            <div className='player-control'>
                <FontAwesomeIcon onClick={() => skipTrackHandler('skip-back')} size='2x' icon={faBackward} />
                <FontAwesomeIcon size='2x' onClick={playHandler} icon={isPlaying ? faPause : faPlay} />
                <FontAwesomeIcon onClick={() => skipTrackHandler('skip-forward')} size='2x' icon={faForward} />
            </div>

        </div>
    )
}

export default Player
