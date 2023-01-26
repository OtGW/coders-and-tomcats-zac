import { useState, useEffect } from "react"
import { useInterval } from "@mantine/hooks"
import { createStyles, Button, Progress, Tooltip } from "@mantine/core"
import { ref, update, push, increment } from "firebase/database"
import { database, useAuthState } from "../hooks/Firebase"
import "./Styles.css"

const useStyles = createStyles(() => ({
  button: {
    position: "relative",
    transition: "background-color 150ms ease",
  },

  progress: {
    position: "absolute",
    bottom: -1,
    right: -1,
    left: -1,
    top: -1,
    height: "auto",
    backgroundColor: "transparent",
    zIndex: 0,
  },

  label: {
    position: "relative",
    zIndex: 1,
  },
}))

function VoteButtonTomcats({ vote, progress, loaded }) {
  const { classes, theme } = useStyles()

  return (
    <Button
      className={classes.button}
      onClick={() => {
        vote(false)
      }}
      variant="gradient"
      gradient={{ from: "indigo", to: "cyan" }}
    >
      <div className={classes.label}>
        {progress !== 0
          ? "Tom's a fiesty one"
          : loaded
          ? "Point for Tomcats!"
          : "Vote Tomcats"}
      </div>
      {progress !== 0 && (
        <Progress
          value={progress}
          className={classes.progress}
          color={theme.fn.rgba(theme.colors[theme.primaryColor][2], 0.35)}
          radius="sm"
        />
      )}
    </Button>
  )
}

export default VoteButtonTomcats
