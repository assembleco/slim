import React from "react"

import Sample from "./Sample"
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
          <Sample {...sample} key={sample.id} />
        ))}
      </div>
    );
  }
}

export default History
