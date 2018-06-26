import React from "react"
import styled from "styled-components"

import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"

class NewSpecForm extends React.Component {
  constructor(props) {
    super(props)

    this.state.part = props.prefilledPartNumber || ""
  }

  state = {
    part: "",
    test_name: "",
    test_method: "",
    criteria: "",
    judgement: "",
  }

  render() {
    return(
      <Layout>
        <Layout.Title>Add a new spec</Layout.Title>

        <TextField
          label="Part Number"
          onChange={(e) => this.setState({ part: e.target.value })}
          value={this.state.part}
        />

        <TextField
          label="Test Name"
          onChange={(e) => this.setState({ test_name: e.target.value })}
          value={this.state.test_name}
        />

        <TextField
          label="Test Method"
          onChange={(e) => this.setState({ test_method: e.target.value })}
          value={this.state.test_method}
        />

        <TextField
          label="Criteria"
          onChange={(e) => this.setState({ criteria: e.target.value })}
          value={this.state.criteria}
        />

        <TextField
          label="Judgement"
          onChange={(e) => this.setState({ judgement: e.target.value })}
          value={this.state.judgement}
        />

        <Button onClick={() => this.props.onCreateSpecification(this.state)}>
          Create Specification
        </Button>
      </Layout>
    )
  }
}

const Layout = styled.div`
  margin-top: 3rem;
  margin-bottom: 3rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1rem;
`

Layout.Title = styled.h3`
  margin-bottom: 1rem;
  grid-column: 1 / -1;
`

export default NewSpecForm
