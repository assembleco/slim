import React from 'react';
import { BrowserRouter as Router } from "react-router-dom"
import styled from "styled-components"

import TabView from "./TabView"
import Assemble from "./Assemble"
import csvParse from "./csvParse"

import Receive from "./Receive"
import Test from "./Test"
import Release from "./Release"

class App extends React.Component {
  assemble = new Assemble("http://localhost:3000")

  state = {
    receivedSamples: [],
    samplesWithCompletedTests: [],
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
                  onReset={() => {
                    this.assemble.run("slim")`delete from results`
                    this.assemble.run("slim")`delete from samples`
                  }}
                />,
              test: () => <Test
                  samples={this.state.receivedSamples}
                />,
              release: () => <Release
                  samples={this.state.samplesWithCompletedTests}
                />,
            }} />
        </Layout>
      </Router>
    )
  }

  componentDidMount() {
    this.assemble.watch("slim")`
      select * from samples
    `((result) => this.setState({ receivedSamples: csvParse(result) }))

    // TODO: this logic for a "completed" sample is flawed -
    // it assumes there are exactly three tests defined for a sample.
    this.assemble.watch("slim")`
      select * from samples where samples.id
      in (
        select sample_id from (
          select sample_id, count(*) count
          from results
          group by sample_id having count(*) >= 3
        ) as counts
      )
    `((result) => this.setState({ samplesWithCompletedTests: csvParse(result) }))
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

export default App
