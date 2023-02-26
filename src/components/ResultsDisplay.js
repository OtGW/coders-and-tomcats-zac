import React, { useState } from "react"
import { Modal } from "@mantine/core"

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
      {/*TODO: image depending on winner, sound, confetti effect*/}
    </Modal>
  )
}

export default ResultsDisplay
