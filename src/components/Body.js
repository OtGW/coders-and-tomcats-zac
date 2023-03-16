import React from "react"
import { Stack } from "@mantine/core"
import WordArt from "react-wordart"
import { Image } from "@mantine/core"
import "./Styles.css"
import { useAuthState } from "../hooks/Firebase"
import Voting from "./Voting"
import PlaySound from "./PlaySound"

const Body = () => {
  const { data } = useAuthState()

  return (
    <Stack justify="center" align="center">
      <WordArt
        id="youveHeard"
        theme="rainbow"
        text="You’ve heard of sorority girls and meerkats..."
        fontSize={60}
      />
      <Image src="/Ugly website photo dump/UnalteredMeerkatCollage.jpg" />
      <PlaySound />

      <WordArt
        id="whyCant"
        theme="slate"
        text="Have you ever asked yourself, why can't that be me??"
      />
      <WordArt
        text="Now it's time to vote on...Coders and Tomcats!"
        theme="rainbow"
      />
      <Image src="Ugly website photo dump\USE THESE PHOTOS\MeerkatShopped\Photo1.jpg" />
      <div>
        <Voting contestNumber={1} />
      </div>
      <Image src="Ugly website photo dump\USE THESE PHOTOS\MeerkatShopped\Photo2Option1.jpg" />
      <div>
        <Voting contestNumber={2} />
      </div>
      <Image src="Ugly website photo dump\USE THESE PHOTOS\MeerkatShopped\Photo3.jpg" />
      <div>
        <Voting contestNumber={3} />
      </div>
      <Image src="Ugly website photo dump\USE THESE PHOTOS\MeerkatShopped\Photo4.jpg" />
      <div>
        <Voting contestNumber={4} />
      </div>
    </Stack>
  )
}

export default Body
