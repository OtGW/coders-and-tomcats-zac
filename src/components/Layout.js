import React from "react"
import { AppShell, Grid } from "@mantine/core"
import Header from "./Header"
import Footer from "./Footer"
import Body from "./Body"
import "./Styles.css"

const Layout = ({ state }) => {
  return (
    <AppShell header={<Header />} footer={<Footer />}>
      {/* <div className="backgroundStyling"> */}
      <Grid justify="center">
        <Grid.Col sm={12} md={8} lg={6} xl={6}>
          <Body />
        </Grid.Col>
      </Grid>
      {/* </div> */}
    </AppShell>
  )
}

export default Layout
