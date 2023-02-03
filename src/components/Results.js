import React, { useState, useEffect } from "react"
import { database, useAuthState } from "../hooks/Firebase"
import ResultsDisplay from "./ResultsDisplay.js"

// TODO: Finish the Results component+functionality

const Results = () => {
  const { user, data, isAuthenticated } = useAuthState()
  const [contestOver, setContestOver] = useState(false)
  const [coderWin, setCoderWin] = useState(0) //useRef for these?
  const [tomcatWin, setTomcatWin] = useState(0)
  //Should probably put these values ^ in the database right? Or is it ok to calculate locally? Just using state here temporarily for practice/proof of concept.

  //memo vs useMemo vs useCallback vs useEffect vs useRef
  //Does this work? Want to make sure it's not recalculating every millisecond
  useEffect(() => {
    const timeLeft = () => {
      const currentTime = Date.now()
      console.log(currentTime)
      const endOfContest = new Date(1669914000)
      console.log(endOfContest)
      return endOfContest - currentTime
    }
    if (timeLeft > 0) {
      setContestOver(false)
    } else {
      setContestOver(true)
    }
  }, [isAuthenticated])

  // const contestOver = () => {
  //   const timeLeft = () => {
  //     const currentTime = Date.now()
  //     console.log(currentTime)
  //     const endOfContest = new Date(1669914000)
  //     console.log(endOfContest)
  //     return endOfContest - currentTime
  //   }
  //   if (timeLeft > 0) {
  //     return false
  //   } else {
  //     return true
  //   }
  // }

  for (let i = 0; i < data.contests.length; i++) {
    if (data[i].coders > data[i].tomcats) {
      setCoderWin((coderWin) => coderWin + 1)
    } else if (data[i].coders < data[i].tomcats) {
      setTomcatWin((tomcatWin) => tomcatWin + 1)
    } else {
    }
  }
  const winner = (coderWin, tomcatWin) => {
    if (coderWin > tomcatWin) {
      return "The winner is Coders!"
    } else if (coderWin < tomcatWin) {
      return "The winner is Tomcats!"
    } else {
      return "It's a tie!"
    }
  }

  //Come back to this, create new component for individual contestResultsDisplay
  //This is making me think I somehow got the order of inheritance wrong. If I
  //want to use logic here in another dumb display component, I couldn't
  //return that component below right? Bc then it'd be grouped together
  //with the modal
  if (!data[contestNumber].open) {
    // return <div> This contest has ended the winner is {Winner()}</div>
  } else {
    return {
      /*the current score and time left*/
    }
  }

  if (contestOver && isAuthenticated) {
    return <ResultsDisplay winner={winner} />
  }
}

export default Results
