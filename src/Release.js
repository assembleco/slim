import React from "react"

import Sample from "./Sample"

import Button from "@material-ui/core/Button"
import T from "@material-ui/core/Typography"
import { Link } from "react-router-dom"

class Release extends React.Component {
  render() {
    return (
      <div>
        {this.props.samples.length === 0
          ? <div>
              <T align="center">No samples in the system are completed.</T>
              <T align="center">Maybe <Link to="/test">see if anything needs testing?</Link></T>
            </div>
          : null
        }

        {this.props.samples.map((sample) => (
          <Sample {...sample} key={sample.id}>
            <Button onClick={() => this.props.onRelease(sample.id)}>
              Release
            </Button>
          </Sample>
        ))}
      </div>
    );
  }
}

export default Release
