import React from "react"
import styled from "styled-components"

import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"

class NewSpecForm extends React.Component {
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
margin-bottom: 3rem;
display: flex;
flex-direction: column;
`

export default NewSpecForm
