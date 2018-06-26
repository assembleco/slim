import React from 'react';
import styled from "styled-components"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"

import Assemble from "./Assemble"
import History from "./History"
import Receive from "./Receive"
import Release from "./Release"
import Sidebar from "./Sidebar"
import SignIn from "./SignIn"
import Specify from "./Specify"
import TabView from "./TabView"
import Test from "./Test"
import { tsvParse } from "./csvParse"

class App extends React.Component {
  assemble = new Assemble("http://localhost:3000")

  state = {
    receivedSamples: [],
    samplesForTesting: [],
    releasedSamples: [],
    samplesWithCompletedTests: [],
    partsWithoutSpecifications: [],
    partsWithSpecifications: [],
    specifications: [],
    user: undefined,
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
            onReset={() => {
              this.assemble.run("slim")`delete from results`
              this.assemble.run("slim")`delete from samples`
              this.assemble.run("slim")`delete from specification`

              this.assemble.run("slim")`
                insert into specification
                (partno,test_name,test_method,criteria,judgement,created_by,created_at)
                values (
                '0123123456',
                'Odor',
                'Organoleptic',
                'Characteristic',
                'result.downcase == "characteristic"',
                'Grayson Wright',
                current_timestamp
                );
              `

              this.assemble.run("slim")`
                insert into specification
                (partno,test_name,test_method,criteria,judgement,created_by,created_at)
                values (
                '0123123456',
                'pH',
                'USP',
                '6.0 - 7.0',
                'result.to_f >= 6 && result.to_f <= 7',
                'Grayson Wright',
                current_timestamp
                );
              `

              this.assemble.run("slim")`
                insert into specification
                (partno,test_name,test_method,criteria,judgement,created_by,created_at)
                values (
                '0123123456',
                'Appearance',
                'Visual',
                'White to off-white cream',
                'result.match?(/white/i)',
                'Grayson Wright',
                current_timestamp
                );
              `
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
              localStorage.user_id = user.id
              localStorage.user_name = user.name
              localStorage.user_username = user.username
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
                  />,
                specify: () =>
                  <Specify
                    partsWithoutSpecifications={this.state.partsWithoutSpecifications}
                    partsWithSpecifications={this.state.partsWithSpecifications}
                    specifications={this.state.specifications}
                    onCreateSpecification={(spec) => this.createSpecification(spec)}
                    onRemoveSpec={(spec_id) => {
                      this.assemble.run("slim")`
                      delete from specification
                      where id = ${spec_id}
                      `
                    }}
                  />,
                test: () => <Test
                    samples={this.state.samplesForTesting}
                    user={this.state.user}
                    onSampleStateChange={(sampleID, newState) =>
                      this.assemble.run("slim")`
                      update samples set status = '${newState}'
                      where id = '${sampleID}'
                      `
                    }
                  />,
                release: () => <Release
                    onRelease={(sampleID) => this.release(sampleID)}
                    samples={this.state.samplesWithCompletedTests}
                  />,
                history: () => <History
                    samples={this.state.releasedSamples}
                  />
              }} />
          : this.state.user === null ? <Redirect to="/sign_in" /> : null
          }
        </Layout>
      </Router>
    )
  }

  componentDidMount() {
    if(localStorage.user_id) {
      this.setState({ user: {
        id: localStorage.user_id,
        name: localStorage.user_name,
        username: localStorage.user_username,
      }})
    } else {
      this.setState({ user: null })
    }

    this.assemble.watch("slim")`
      select * from samples
      where status = 'Received'
    `((result) => this.setState({ receivedSamples: tsvParse(result) }))

    this.assemble.watch("slim")`
      select * from samples
      where status = 'Received'
      and partno in (select distinct partno from specification)
    `((result) => this.setState({ samplesForTesting: tsvParse(result) }))

    this.assemble.watch("slim")`
      select * from samples
      where status = 'Released'
    `((result) => this.setState({ releasedSamples: tsvParse(result) }))

    this.assemble.watch("slim")`
      select * from samples
      where status = 'Completed'
    `((result) => this.setState({ samplesWithCompletedTests: tsvParse(result) }))

    this.assemble.watch("slim")`
      select distinct partno, item from samples
      where partno not in (select distinct partno from specification)
    `((result) => this.setState({ partsWithoutSpecifications: tsvParse(result) }))

    this.assemble.watch("slim")`
      select distinct partno, item from samples
      where partno in (select distinct partno from specification)
    `((result) => this.setState({ partsWithSpecifications: tsvParse(result) }))

    this.assemble.watch("slim")`
      select * from specification
    `((result) => this.setState({ specifications: tsvParse(result) }))
  }

  componentWillUnmount() {
    this.assemble.destruct()
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
    .then(tsvParse)
    .then((samples) => samples.forEach((sampleInfo) => this.assemble.run("slim")`
      insert into samples
      (id, partNo, item, customer, status, received_by, received_at)
      values (
      '${sampleInfo.id}',
      '${sampleInfo.part}',
      '${sampleInfo.item}',
      '${sampleInfo.customer}',
      'Received',
      '${this.state.user.name}',
      (TIMESTAMP '${(new Date()).toJSON()}')
      )
    `))
  }

  release(sampleID) {
    this.assemble.run("slim")`
      update samples set
      status = 'Released',
      released_by = '${this.state.user.name}',
      released_at = (TIMESTAMP '${(new Date()).toJSON()}')
      where id = '${sampleID}'
    `
  }

  createSpecification({ part, test_name, test_method, criteria, judgement }) {
    this.assemble.run("slim")`
      insert into specification
      (partno,test_name,test_method,criteria,judgement,created_by,created_at) values (
      '${part}',
      '${test_name}',
      '${test_method}',
      '${criteria}',
      '${judgement}',
      '${this.state.user.name}',
      current_timestamp
      );
  `
  }
}

const Layout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr 0;
  grid-column-gap: 3rem;
  height: 100%;
  grid-template-rows: 100%;
`

export default App
