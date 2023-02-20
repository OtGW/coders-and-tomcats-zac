import React, { useState, useEffect } from "react"
import { ref, onValue } from "firebase/database"
import { database, useAuthState } from "../hooks/Firebase"
import ResultsDisplay from "./ResultsDisplay.js"

// TODO: Finish the Results component+functionality

const Results = () => {
  const { user, data, isAuthenticated } = useAuthState()
  const [contestOver, setContestOver] = useState(false)
  // const [coderWin, setCoderWin] = useState(0) //useRef for these?
  // const [tomcatWin, setTomcatWin] = useState(0)
  const [winner, setWinner] = useState("")
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

  //left this here
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

  //TODO: Bug where sometimes it updates coderWins, tomcatWins, and others not; also It's a tie! vs Coders win! - Weirdly, sometimes refreshing doesn't work but adding comments like this one in the code finally gets it to update those counts.
  useEffect(() => {
    let coderWin = 0
    let tomcatWin = 0
    //hardcoded b/c couldn't figure out how to get the length/size of # of contests in database
    for (let i = 1; i < 5; i++) {
      let coderData
      let tomcatData
      const coderContestRef = ref(database, `/Contests/${i}/coders`)
      onValue(coderContestRef, (snapshot) => {
        coderData = snapshot.val()
      })
      const tomcatContestRef = ref(database, `/Contests/${i}/tomcats`)
      onValue(tomcatContestRef, (snapshot) => {
        tomcatData = snapshot.val()
      })
      if (coderData > tomcatData) {
        coderWin++
        //       setCoderWin((coderWin) => coderWin + 1)
      } else if (coderData < tomcatData) {
        tomcatWin++
        //       setTomcatWin((tomcatWin) => tomcatWin + 1)
      } else {
      }
    }
    if (coderWin > tomcatWin) {
      setWinner("The winner is Coders!")
    } else if (coderWin < tomcatWin) {
      setWinner("The winner is Tomcats!")
    } else {
      setWinner("It's a tie!")
    }
  }, [])

  //Come back to this, create new component for individual contestResultsDisplay
  //This is making me think I somehow got the order of inheritance wrong. If I
  //want to use logic here in another dumb display component, I couldn't
  //return that component below right? Bc then it'd be grouped together
  //with the modal
  // if (!data[contestNumber].open) {
  // return <div> This contest has ended the winner is {Winner()}</div>
  // } else {
  //   return {
  /*the current score and time left*/
  //   }
  // }

  if (contestOver && isAuthenticated) {
    return <ResultsDisplay winner={winner} />
  }
}

export default Results
