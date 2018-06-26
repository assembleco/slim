import React from "react"
import styled from "styled-components"

import Assemble from "./Assemble"
import Sample from "./Sample"
import T from "@material-ui/core/Typography"
import { Link } from "react-router-dom"
import { tsvParse } from "./csvParse"

class StandaloneSample extends React.Component {
  assemble = new Assemble("https://localhost:3000")

  state = { sample: null }

  componentDidMount() {
    this.assemble.watch("slim")`
    select * from samples
    where id = '${this.props.id}'
    `((result) => {
      this.setState({ sample: tsvParse(result)[0] })
    })
  }

  render = () => (
    <Layout>
      { this.state.sample
      ? <Sample {...this.state.sample} disabled expanded >
          <Link to={`/${this.step().toLowerCase()}/${this.props.id}`}>
            View on the {this.step()} page
          </Link>
        </Sample>
      : <T>Loading...</T>
      }
    </Layout>
  )

  step = () => (
    {
      "Received": "Test",
      "Completed": "Release",
      "Released": "History",
    }[this.state.sample.status]
  )

  componentWillUnmount() {
    this.assemble.destruct()
  }
}

const Layout = styled.div`
margin-top: 3rem;
`

export default StandaloneSample
