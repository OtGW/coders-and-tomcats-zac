import React from "react"
import { database, useAuthState } from "../hooks/Firebase"

// TODO: Finish the Results component+functionality

const Results = (contestNumber) => {
  const { data } = useAuthState()
  let coderWin = 0
  let tomcatWin = 0
  for (let i = 0; i < data.contests.length; i++) {
    if (data[contestNumber].coders > data[contestNumber].tomcats) {
      coderWin += 1
    } else if (data[contestNumber].coders < data[contestNumber].tomcats) {
      tomcatWin += 1
    } else {
    }
    return { coderWin, tomcatWin }
  }
  function Winner(coderWin, tomcatWin) {
    if (coderWin > tomcatWin) {
      return
    }
  }

  if (!data[contestNumber].open) {
    return <div> This contest has ended the winner is {Winner()}</div>
  } else {
    return {
      /*the current score and time left*/
    }
  }
}

export default Results
