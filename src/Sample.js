import React from "react"
import styled from "styled-components"

import Assemble from "./Assemble"
import csvParse from "./csvParse"

import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Avatar from "@material-ui/core/Avatar"
import Pass from "@material-ui/icons/Check"
import Fail from "@material-ui/icons/Close"

import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import T from "@material-ui/core/Typography"

class Sample extends React.Component {
  assemble = new Assemble("https://localhost:3000")

  state = { results: [] }

  componentDidMount() {
    this.assemble.watch("slim")`
    select
    specification.test_name,
    specification.test_method,
    specification.criteria,
    specification.judgement,
    results.result,
    results.pass,
    results.entered_at,
    results.entered_by

    from samples
    left outer join specification
    on specification.partno = samples.partno
    left outer join results
    on specification.test_name = results.test_name
    and results.sample_id = samples.id
    where samples.id = '${this.props.id}'
    `((results) => this.setState({ results: csvParse(results) }))
  }

  render() {
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div>
            <T variant="caption" align="left">{this.props.customer}</T>
            <T variant="title" align="left">{this.props.item}</T>
            <T variant="caption" align="left">{this.props.received_by} received at {this.props.received_at}</T>
          </div>

          <SummaryRight>
            <T variant="caption" align="right">Part {this.props.partno}</T>
            <T variant="subheading" align="right">{this.props.id.toUpperCase()}</T>
          </SummaryRight>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <List dense>
            {this.state.results.map((result) => (
              <ListItem key={result.test_name}>
                <Avatar color={result.pass === "true" ? "primary" : "error"} >
                  {result.pass === "true" ? <Pass /> : <Fail />}
                </Avatar>

                <ListItemText primary={`${result.test_name} – ${result.test_method}`} secondary={`${result.entered_by} recorded at ${result.entered_at}`} />
                <ListItemText align="right" primary={result.result} secondary={`Expected: ${result.criteria}`} />
              </ListItem>
            ))}
          </List>
        </ExpansionPanelDetails>

        {this.props.children
        ? <ExpansionPanelActions>
            {this.props.children}
          </ExpansionPanelActions>
        : null
        }
      </ExpansionPanel>
    )
  }
}

const Layout = styled.div`
`

const SummaryRight = styled.div`
margin-left: auto;
`

export default Sample
