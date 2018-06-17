import React from "react"
import styled from "styled-components";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions"
import Button from "@material-ui/core/Button"
import T from "@material-ui/core/Typography"
import { Link } from "react-router-dom"

class Release extends React.Component {
  render() {
    return (
      <div>
        {this.props.samples.length === 0
          ? <div>
              <T align="center">No samples in the system aare completed.</T>
              <T align="center">Maybe <Link to="/receive">see if anything needs testing?</Link></T>
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

            <ExpansionPanelActions>
              <Button>Release</Button>
            </ExpansionPanelActions>
          </ExpansionPanel>
        ))}
      </div>
    );
  }
}

export default Release
