import React from 'react';
import { BrowserRouter as Router } from "react-router-dom"
import styled from "styled-components"

import TabView from "./TabView"

const App = (state) => (
  <Router>
    <Layout>
      <Sidebar />

      <TabView
        tabs={{
          receive: () => <PageContent />,
          test: () => <PageContent />,
          review: () => <PageContent />,
          release: () => <PageContent />,
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

const PageContent = styled.div`
  height: 10rem;
  background-color: black;
`

export default App
