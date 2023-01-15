import React, { useState } from "react"
import { MantineProvider } from "@mantine/core"
import Layout from "./components/Layout"
import { AuthContextProvider, useAuthState } from "./hooks/Firebase"

function App() {
  return (
    <MantineProvider>
      {/*component library*/}
      <AuthContextProvider>
        {/*custom components connecting to database*/}
        <Layout />
      </AuthContextProvider>
    </MantineProvider>
  )
}

export default App
