import React from 'react';
import { BrowserRouter as Router } from "react-router-dom"
import styled from "styled-components"

import TabView from "./TabView"

import Receive from "./Receive"
import Test from "./Test"
import Review from "./Review"
import Release from "./Release"

class App extends React.Component {
  assemble = new Assemble("http://localhost:3000")

  state = {
    receivedSamples: [],
  }

  render() {
    return (
      <Router>
        <Layout>
          <Sidebar />

          <TabView
            tabs={{
              receive: () =>
                <Receive
                  samples={this.state.receivedSamples}
                  onReceive={this.fetchSampleInfo.bind(this)}
                />,
              test: () => <Test />,
              review: () => <Review />,
              release: () => <Release />,
            }} />
        </Layout>
      </Router>
    )
  }

  componentDidMount() {
    this.assemble.watch("slim")`
      select * from samples where status = 'Received'
    `
    .then(stubData)
    .then((samples) => this.setState({ receivedSamples: samples }))
  }

  fetchSampleInfo(sampleNo) {
    this.assemble.system("accupacDatabase")`
      select
      qjobid as 'Sample',
      parts.partno as 'Part #',
      customer.custname as 'Customer' from qjob

      inner join parts on qjob.partno = parts.partno
      inner join customer on customer.custno = LEFT(parts.partno, 4)

      where qjobid = '${sampleNo}'
      or workorderno = '${sampleNo}'
    `
    .then(csvParse)
    .then((samples) => samples.forEach((sampleInfo) => this.assemble.system("slim")`
      insert into samples
      (id, partNo, customer, status)
      ${sampleInfo.id}, ${sampleInfo.partNo}, ${sampleInfo.customer}, 'Recieved'
    `))
  }
}

const Layout = styled.div`
  display: grid;
  grid-template-columns: 30% 1fr 0;
  grid-column-gap: 3rem;
`

const Sidebar = styled.div`
background-color: blue;
`

class Assemble {
  constructor(url) {
    this.url = url
  }

  system = (system) => (
    (template, ...expresions) => new Promise(resolve => { resolve([]) })
  )

  watch = (system) => (
    (template, ...expresions) => new Promise(resolve => { resolve([]) })
  )
}

const csvParse = () => ([])

const stubData = () => ([
  {
    id: "q123456",
    partNo: "0123456789",
    customer: "PharmaCo",
    item: "Anti-Cavity Toothpaste",
  },
  {
    id: "q123456",
    partNo: "0123456789",
    customer: "PharmaCo",
    item: "Anti-Cavity Toothpaste",
  },
  {
    id: "q123456",
    partNo: "0123456789",
    customer: "PharmaCo",
    item: "Anti-Cavity Toothpaste",
  },
])

export default App
