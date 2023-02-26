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
}

export default ResultsDisplay
