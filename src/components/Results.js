import React, { useState, useEffect } from "react"
import { ref, onValue } from "firebase/database"
import { database, useAuthState } from "../hooks/Firebase"
import ResultsDisplay from "./ResultsDisplay.js"

//TODO: Bug where sometimes it updates coderWin, tomcatWin, and others not; also It's a tie! vs Coders win! - Weirdly, sometimes refreshing doesn't work but adding comments like this one in the code finally gets it to update those counts.

const Results = () => {
  const { user, data, isAuthenticated } = useAuthState()
  const [contestOver, setContestOver] = useState(false)
  const [winner, setWinner] = useState("")
  //TODO: put "winner" in Firebase hook or directly in database?

  //memo vs useMemo vs useCallback vs useEffect vs useRef

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
      //^Put these in the Firebase custom Hook?
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

  if (contestOver && isAuthenticated) {
    return <ResultsDisplay winner={winner} />
  }
}

export default Results

//TODO: create new component for individual contestResultsDisplay (starter code below)
//This is making me think I somehow got the order of inheritance wrong. If I
//want to use logic here in another dumb display component, I couldn't
//return that component below right? Bc then it'd be grouped together
//with the modal; I'd want it ultimately passed to the body
// if (!data[contestNumber].open) {
// return <div> This contest has ended the winner is {Winner()}</div>
// } else {
//   return {
/*the current score and time left*/
//   }
// }
