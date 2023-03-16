import React, { useState, useEffect } from "react"
import { ref, onValue } from "firebase/database"
import { database, useAuthState } from "../hooks/Firebase"
import ResultsDisplay from "./ResultsDisplay.js"

const Results = () => {
  const { data, isAuthenticated } = useAuthState()
  const [contestOver, setContestOver] = useState(false)
  const [winner, setWinner] = useState("")

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

  useEffect(() => {
    let coderWin = 0
    let tomcatWin = 0
    //TODO: get length/size of # of contests in database instead of hardcoding i < 5
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
      } else if (coderData < tomcatData) {
        tomcatWin++
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
  }, [data])

  if (contestOver && isAuthenticated) {
    return <ResultsDisplay winner={winner} />
  }
}

export default Results

//TODO: create new component for individual contestResultsDisplay (starter code below)
// if (!data[contestNumber].open) {
// return <div> This contest has ended the winner is {Winner()}</div>
// } else {
//   return {
/*the current score and time left*/
//   }
// }
