import React, { useState } from "react"
import { Modal } from "@mantine/core"
import { ref, update, push, increment } from "firebase/database"
import { database, useAuthState } from "../hooks/Firebase"

const ResultsDisplay = ({ winner }) => {
  const [opened, setOpened] = useState(true)

  return (
    <Modal
      centered
      opened={opened}
      size="auto"
      onClose={() => setOpened(false)}
    >
      This contest has ended. {winner}
      {/*image depending on winner, sound, confetti effect*/}
    </Modal>
  )

  //event listener: detect new login, setOpened(true)
  //^ possibly useEffect in LoginButton, setOpened(true)
  //Also when page reloads && isAuthenticated/auth - getAuth()
}

export default ResultsDisplay

/*
TODO: Dumb component - pop up box that displays from Results.js. Start w/
just simple pop up, possibly using useRef? But eventually more visually pleasing/
funny pop up w/ visuals representing winning team, sound effect and confetti.
*/
//TODO: Should this be a useEffect in Results.js instead?
