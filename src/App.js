import React from 'react';
import { BrowserRouter as Router } from "react-router-dom"
import styled from "styled-components"

import TabView from "./TabView"
import Assemble from "./Assemble"

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
          <Sidebar>
            Filters &gt;
          </Sidebar>

          <TabView
            tabs={{
              receive: () =>
                <Receive
                  samples={this.state.receivedSamples}
                  onReceive={this.fetchSampleInfo.bind(this)}
                  onClearSamples={() => this.assemble.run("slim")`delete from samples`}
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
    `((result) => this.setState({ receivedSamples: csvParse(result) }))
  }

  fetchSampleInfo(sampleNo) {
    this.assemble.run("accupacDatabase")`
      select
      qjobid as 'id',
      parts.partno as 'part',
      descLong as 'item',
      customer.custname as 'customer' from qjob

      inner join parts on qjob.partno = parts.partno
      inner join customer on customer.custno = LEFT(parts.partno, 4)

      where qjobid = '${sampleNo}'
      or workorderno = '${sampleNo}'
    `
    .then(csvParse)
    .then((samples) => samples.forEach((sampleInfo) => this.assemble.run("slim")`
      insert into samples
      (id, partNo, item, customer, status)
      values (
      '${sampleInfo.id}',
      '${sampleInfo.part}',
      '${sampleInfo.item}',
      '${sampleInfo.customer}',
      'Received'
      )
    `))
  }
}

const Layout = styled.div`
  display: grid;
  grid-template-columns: 8rem 1fr 0;
  grid-column-gap: 3rem;
  height: 100%;
  grid-template-rows: 100%;
`

const Sidebar = styled.div`
  background-color: rgb(98, 165, 226);
  color: white;
  text-align: center;
  padding-top: 2rem;
`

const csvParse = (csvData) => {
  let lines = csvData.trim().split("\n")
  let headers = lines.shift()

  let results = []
  lines.forEach((line) => {
    let result = {}

    headers.split(",").forEach((field, index) => {
      result[field] = line.split(",")[index]
    })

    results.push(result)
  })

  return results;
}

export default App
