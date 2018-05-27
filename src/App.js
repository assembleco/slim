import React from 'react';
import styled from "styled-components"

import Steps from "./Steps"

const App = (state) => (
  <Layout>
    <Steps steps={["Receive", "Test", "Review", "Release"]} />

    <p>
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
  </Layout>
)

const Layout = styled.div`
`

export default App
