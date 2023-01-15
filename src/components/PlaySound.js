import React from "react"
import { useAudio } from "react-awesome-audio"
import MMSong from "C:/Users/night/code/UglyWebsiteContest/zac-ugly-project/src/components/MMSong.mp3"

const PlaySound = () => {
  const { isPlaying, play, pause, toggle } = useAudio({
    src: MMSong,
    loop: true,
  })
  return (
    <div>
      <button onClick={toggle}>{isPlaying ? "Pause" : "Play"}</button>
    </div>
  )
}

export default PlaySound
