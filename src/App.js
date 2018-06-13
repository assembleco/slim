import React from 'react';
import { BrowserRouter as Router } from "react-router-dom"
import styled from "styled-components"

import TabView from "./TabView"

import Receive from "./Receive"
import Test from "./Test"
import Review from "./Review"
import Release from "./Release"

const App = (state) => (
  <Router>
    <Layout>
      <Sidebar />

      <TabView
        tabs={{
          receive: () => <Receive onReceive={console.log} />,
          test: () => <Test />,
          review: () => <Review />,
          release: () => <Release />,
        }} />
    </Layout>
  </Router>
)

const Layout = styled.div`
  display: grid;
  grid-template-columns: 30% 1fr;
  grid-column-gap: 3rem;
`

const Sidebar = styled.div`
background-color: blue;
`

export default App
