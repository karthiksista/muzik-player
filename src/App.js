import React, { useState, useRef } from 'react';
import Library from './components/Library';
import Nav from './components/Nav';
import Player from './components/Player';
import Song from './components/Song';
import './styles/app.scss';
import data from './data'
function App() {
  //State 
  const [songs, setSongs] = useState(data())
  const [currentSong, setcurrentSong] = useState(songs[0])
  const [isPlaying, setisPlaying] = useState(false)
  const currentSongRef = useRef(null)
  const timeHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    const roundCurrent = Math.round(current)
    const roundDuration = Math.round(duration)
    const animation = Math.round((roundCurrent / roundDuration) * 100)
    setsongInfo({ ...songInfo, currentTime: current, duration, animationPercentage: animation })
  }
  const [songInfo, setsongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0
  })
  const [libraryStatus, setlibraryStatus] = useState(false)

  const songEndedHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setcurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) currentSongRef.current.play()
  }
  return (
    <div className='App'>
      <Nav
        libraryStatus={libraryStatus}
        setlibraryStatus={setlibraryStatus} />

      <Song
        name={currentSong.name}
        artist={currentSong.artist}
        cover={currentSong.cover} />

      <Player
        isPlaying={isPlaying}
        setisPlaying={setisPlaying}
        currentSong={currentSong}
        currentSongRef={currentSongRef}
        songInfo={songInfo}
        setsongInfo={setsongInfo}
        setcurrentSong={setcurrentSong}
        songs={songs}
        setSongs={setSongs} />

      <Library
        libraryStatus={libraryStatus}
        currentSong={currentSong}
        songs={songs}
        setcurrentSong={setcurrentSong}
        isPlaying={isPlaying}
        setisPlaying={setisPlaying}
        currentSongRef={currentSongRef}
        setSongs={setSongs} />

      <audio
        onTimeUpdate={timeHandler}
        onLoadedMetadata={timeHandler}
        ref={currentSongRef}
        onEnded={songEndedHandler}
        src={currentSong.audio}>
      </audio>
    </div>
  );
}

export default App;
