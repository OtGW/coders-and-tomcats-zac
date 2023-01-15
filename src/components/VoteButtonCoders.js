import { useState, useEffect } from 'react'
import { useInterval } from '@mantine/hooks'
import { createStyles, Button, Progress } from '@mantine/core'
import { ref, update, push, increment } from 'firebase/database'
import { database, useAuthState } from '../hooks/Firebase'
import './Styles.css'

const useStyles = createStyles(() => ({
  button: {
    position: 'relative',
    transition: 'background-color 150ms ease',
  },

  progress: {
    position: 'absolute',
    bottom: -1,
    right: -1,
    left: -1,
    top: -1,
    height: 'auto',
    backgroundColor: 'transparent',
    zIndex: 0,
  },

  label: {
    position: 'relative',
    zIndex: 1,
  },
}))

function VoteButtonCoders({ vote, progress, loaded }) {
  const { classes, theme } = useStyles()
  // const { data, user, isAuthenticated } = useAuthState()

  return (
    <Button
      className={classes.button}
      onClick={() => {
        vote(true)
      }}
      variant="gradient"
      gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
      //   color={loaded ? "teal" : theme.primaryColor}
    >
      <div className={classes.label}>
        {progress > 0
          ? 'Job plz?'
          : loaded
          ? 'Point for Coders!'
          : 'Vote Coders'}
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

export default VoteButtonCoders
