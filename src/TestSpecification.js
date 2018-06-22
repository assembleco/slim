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
    return (
      <ListItem>
        <Avatar>
          <Help />
        </Avatar>

        <ListItemText primary={`${this.props.spec.test_name} - ${this.props.spec.test_method}`} secondary={`Expected: ${this.props.spec.criteria}`} />
        <ListItemText align="right" primary={
          <TextField
            disabled={this.props.disabled}
            value={this.state.value}
            onChange={(e) => this.setState({ value: e.target.value }) }
          />
        } secondary={
          this.props.disabled
          ? null
          : <Button onClick={() => this.props.onResult(this.state.value)} >
              <SaveIcon/> Save
            </Button>
        } />
      </ListItem>
    )
  }
}

export default TestSpecification
