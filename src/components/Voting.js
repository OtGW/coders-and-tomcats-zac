import React, { useState, useEffect } from "react"
import { useInterval } from "@mantine/hooks"
import { createStyles, Button, Progress, Tooltip, Stack } from "@mantine/core"
import { ref, update, push, increment } from "firebase/database"
import { database, useAuthState } from "../hooks/Firebase"
import "./Styles.css"
import VoteButtonCoders from "./VoteButtonCoders.js"
import VoteButtonTomcats from "./VoteButtonTomcats.js"

const Voting = ({ contestNumber }) => {
  const [userVoted, setUserVoted] = useState(false)
  const { data, user, isAuthenticated } = useAuthState()
  const [progressCoders, setProgressCoders] = useState(0)
  const [progressCats, setProgressCats] = useState(0)
  const [loadedCat, setLoadedCat] = useState(false)
  const [loadedCoder, setLoadedCoder] = useState(false)

  const intervalCoders = useInterval(
    () =>
      setProgressCoders((current) => {
        if (current < 100) {
          return current + 1
        }

        intervalCoders.stop()
        setLoadedCoder(true)
        return 0
      }),
    20
  )
  const intervalCats = useInterval(
    () =>
      setProgressCats((current) => {
        if (current < 100) {
          return current + 1
        }

        intervalCats.stop()
        setLoadedCat(true)
        return 0
      }),
    20
  )

  //Have they voted?
  useEffect(() => {
    //fetch data here set state accordingly
    if (!data) {
      return
    }

    if (!isAuthenticated) {
      setUserVoted(false)
    } else {
      if (data[contestNumber].votes) {
        if (data[contestNumber].votes[user.uid]) {
          setUserVoted(true)
        } else {
          setUserVoted(false)
        }
      } else {
        setUserVoted(false)
      }
    }
  }, [isAuthenticated, data, user, contestNumber])

  const submitVote = (coders) => {
    if (!isAuthenticated) {
      return
    }
    if (userVoted) {
      return
    }

    const contestRef = ref(database, `/Contests/${contestNumber}`)

    const updates = {}
    updates[`/${coders ? "coders" : "tomcats"}`] = increment(1)
    updates[`/votes/${user.uid}`] = true

    update(contestRef, updates)
    if (coders) {
      intervalCoders.start()
    } else {
      intervalCats.start()
    }
  }

  return (
    <div className="voteButton">
      <Stack>
        <Tooltip label="Log in first, fool" disabled={isAuthenticated}>
          <Tooltip
            label="Bored? Click the icon in the bottom right to see cheat codes you can type on this page!"
            disabled={!isAuthenticated || !userVoted}
          >
            <div>
              <VoteButtonTomcats
                vote={submitVote}
                progress={progressCats}
                loaded={loadedCat}
              />
            </div>
          </Tooltip>
        </Tooltip>
        <div>{data && <div>Score: {data[contestNumber].tomcats}</div>}</div>
      </Stack>
      <Stack>
        <Tooltip label="Log in first, fool" disabled={isAuthenticated}>
          <Tooltip
            label="Bored? Click the icon in the bottom right to see cheat codes you can type on this page!"
            disabled={!isAuthenticated || !userVoted}
          >
            <div>
              <VoteButtonCoders
                vote={submitVote}
                progress={progressCoders}
                loaded={loadedCoder}
              />
            </div>
          </Tooltip>
        </Tooltip>
        <div>{data && <div>Score: {data[contestNumber].coders}</div>}</div>
      </Stack>
    </div>
  )
}

export default Voting
