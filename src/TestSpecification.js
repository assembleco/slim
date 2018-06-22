import React from "react"

import Button from "@material-ui/core/Button"
import SaveIcon from '@material-ui/icons/Save';
import TextField from "@material-ui/core/TextField"

import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Avatar from "@material-ui/core/Avatar"
import { Help } from "mdi-material-ui"

class TestSpecification extends React.Component {
  state = { value: "" }

  render() {
    let result = this.props.result

    return (
      <ListItem>
        <Avatar>
          <Help />
        </Avatar>

        <ListItemText primary={`${result.test_name} - ${result.test_method}`} secondary={`Expected: ${result.criteria}`} />
        <ListItemText align="right" primary={
          <TextField
            disabled={this.props.disabled}
            value={this.state.value}
            onChange={(e) => this.setState({ value: e.target.value }) }
          />
        } secondary={
          this.props.disabled
          ? null
          : <Button onClick={() => this.recordResult()} >
              <SaveIcon/> Save
            </Button>
        } />
      </ListItem>
    )
  }

  recordResult() {
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
}

export default TestSpecification
