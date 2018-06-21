import React from "react"

import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import T from "@material-ui/core/Typography"
import { Link } from "react-router-dom"

class History extends React.Component {
  render() {
    return (
      <div>
        {this.props.samples.length === 0
          ? <div>
              <T align="center">No samples in the system aare completed.</T>
              <T align="center">Maybe <Link to="/test">see if anything needs testing?</Link></T>
            </div>
          : null
        }

        {this.props.samples.map((sample) => (
          <ExpansionPanel key={sample.id}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <T>[{sample.id}] {sample.customer}: {sample.item}</T>
            </ExpansionPanelSummary>

            <ExpansionPanelDetails>
              Something?
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </div>
    );
  }
}

export default History
