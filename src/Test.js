import React from "react";

import Sample from "./Sample"

import { Link } from "react-router-dom"

import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import T from "@material-ui/core/Typography"

class Test extends React.Component {
  render() {
    return (
      <div>
        {this.props.samples.length === 0
          ? <div>
              <T align="center">No samples in the system need testing.</T>
              <T align="center">Maybe <Link to="/receive">check the intake station?</Link></T>
            </div>
          : null
        }

        {this.props.samples.map((sample) => (
          <Sample key={sample.id} user={this.props.user} {...sample} />
        ))}
      </div>
    );
  }
}

export default Test
