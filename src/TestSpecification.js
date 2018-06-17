import React from "react"
import styled from "styled-components"
import Assemble from "./Assemble"
import csvParse from "./csvParse"

import Button from "@material-ui/core/Button"
import SaveIcon from '@material-ui/icons/Save';
import T from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"

class TestSpecification extends React.Component {
  state = { value: "", recordedResult: null }

  assemble = new Assemble("http://localhost:3000")

  componentDidMount() {
    this.assemble.watch("slim")`
      select * from results
      where sample_id = '${this.props.sample_id}'
      and test_name = '${this.props.name}'
    `((results) => {
      let recordedResult = csvParse(results)[0]
      this.setState({ recordedResult: recordedResult || null })
    })
  }

  render() {
    return (
      <Layout>
        <T>{this.props.name}</T>
        <T>{this.props.method}</T>
        <T>{this.props.criteria}</T>

        <TextField
          disabled={this.state.recordedResult !== null}
          value={this.state.recordedResult && this.state.recordedResult.result || this.state.value}
          onChange={(e) => this.setState({ value: e.target.value }) }
        />

        {this.state.recordedResult
        ? "Recorded"
        : <Button
            // TODO this automatically assumes that it passes.
            // We should have a callback to help determine whether it does or not.
            onClick={(result, source) =>
              this.assemble.run("slim")`
                insert into results
                (sample_id, test_name, result, pass)
                values (
                  '${this.props.sample_id}',
                  '${this.props.name}',
                  '${this.state.value}',
                  ${true}
                )
              `
            }
          >
            <SaveIcon/> Save
          </Button>
        }
      </Layout>
    )
  }
}

const Layout = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
`

export default TestSpecification
