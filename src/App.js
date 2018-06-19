import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import styled from "styled-components"

import Assemble from "./Assemble"
import Receive from "./Receive"
import Release from "./Release"
import Sidebar from "./Sidebar"
import TabView from "./TabView"
import Test from "./Test"
import csvParse from "./csvParse"
import SignIn from "./SignIn"

class App extends React.Component {
  assemble = new Assemble("http://localhost:3000")

  state = {
    receivedSamples: [],
    samplesWithCompletedTests: [],
    user: null,
  }

  render() {
    return (
      <Router>
        <Layout>
          <Sidebar
            user={this.state.user}
            onSignOut={() => {
              localStorage.removeItem("user_id")
              localStorage.removeItem("user_name")
              localStorage.removeItem("user_username")
              this.setState({ user: null })
            }}
          />

          <Route path="/sign_in" component={() => <SignIn
            host="TODO"
            port="TODO"
            bind_dn="TODO"
            base="TODO"
            user_filter="TODO"
            user={this.state.user}
            onSignIn={(user) => {
              localStorage.setItem("user_id", user.id)
              localStorage.setItem("user_name", user.name)
              localStorage.setItem("user_username", user.username)
              this.setState({ user: user })
            }}
          />} />

          {this.state.user
          ?  <TabView
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
                    user={this.state.user}
                  />,
                release: () => <Release
                    samples={this.state.samplesWithCompletedTests}
                  />,
              }} />
          : <Redirect to="/sign_in" />
          }
        </Layout>
      </Router>
    )
  }

  componentDidMount() {
    if(localStorage.getItem("user_id")) {
      this.setState({ user: {
        id: localStorage.getItem("user_id"),
        name: localStorage.getItem("user_name"),
        username: localStorage.getItem("user_username"),
      }})
    }

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
      (id, partNo, item, customer, received_by, received_at)
      values (
      '${sampleInfo.id}',
      '${sampleInfo.part}',
      '${sampleInfo.item}',
      '${sampleInfo.customer}',
      '${this.state.user.name}',
      (TIMESTAMP '${(new Date()).toJSON()}')
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

export default App
