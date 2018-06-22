import React from "react";

import { Link } from "react-router-dom"
import T from "@material-ui/core/Typography"

import Sample from "./Sample"

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
          <Sample key={sample.id} user={this.props.user} {...sample} onSampleStateChange={this.props.onSampleStateChange} />
        ))}
      </div>
    );
  }
}

export default Test
