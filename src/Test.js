import React from "react";

import TestSpecification from "./TestSpecification"

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
          <ExpansionPanel key={sample.id}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <T>[{sample.id}] {sample.customer}: {sample.item}</T>
            </ExpansionPanelSummary>

            <ExpansionPanelDetails>
              {React.createElement(lookupTestPlan(sample.partno), {
                sample_id: sample.id,
                user: this.props.user,
              })}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </div>
    );
  }
}

const lookupTestPlan = (partNo) => (
  {
    "0123123456": TestPlan0123123456,
    "0123234567": TestPlan0123234567,
  }[partNo]
)

class TestPlan0123123456 extends React.Component {
  render() {
    return (
      <div>
        <TestSpecification
          user={this.props.user}
          sample_id={this.props.sample_id}
          name="Appearance"
          method="Visual"
          criteria="White to off-white cream"
        />

        <TestSpecification
          user={this.props.user}
          name="Odor"
          sample_id={this.props.sample_id}
          method="Organoleptic"
          criteria="Characteristic"
        />

        <TestSpecification
          user={this.props.user}
          sample_id={this.props.sample_id}
          name="pH"
          method="USP"
          criteria="6.0 - 7.0"
        />
      </div>
    )
  }
}

const TestPlan0123234567 = ({ sample }) => {
  return (
    <div>
      No plan has been defined for part 0123234567 yet.
    </div>
  )
}

export default Test
