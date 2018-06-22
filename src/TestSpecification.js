import React from "react"
import styled from "styled-components"
import csvParse from "./csvParse"

import Button from "@material-ui/core/Button"
import SaveIcon from '@material-ui/icons/Save';
import T from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"

class TestSpecification extends React.Component {
  state = { value: "", recordedResult: null }

  componentDidMount() {
    this.props.assemble.watch("slim")`
      select * from results
      where sample_id = '${this.props.sample_id}'
      and test_name = '${this.props.name}'
    `((results) => {
      let recordedResult = csvParse(results)[0]
      this.setState({ recordedResult: recordedResult || null })

      if(recordedResult)
        this.props.onComplete()
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
          value={(this.state.recordedResult && this.state.recordedResult.result) || this.state.value}
          onChange={(e) => this.setState({ value: e.target.value }) }
        />

        {this.state.recordedResult
        ? <T>{this.state.recordedResult.entered_by} recorded at
          <T variant="caption">{this.state.recordedResult.entered_at}</T>
          </T>
        : <Button
            onClick={(result, source) =>
              this.props.assemble.run("judge")`
              result = '${this.state.value}'
              ${this.props.judgement}
              `
              .then((test_passed) => {
                this.props.assemble.run("slim")`
                  insert into results
                  (sample_id, test_name, result, pass, entered_by, entered_at)
                  values (
                    '${this.props.sample_id}',
                    '${this.props.name}',
                    '${this.state.value}',
                    ${test_passed},
                    '${this.props.user.name}',
                    (TIMESTAMP '${(new Date()).toJSON()}')
                  )
                `
              })
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
