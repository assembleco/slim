import React from "react"

import Assemble from "./Assemble"
import csvParse from "./csvParse"
import TestSpecification from "./TestSpecification"

import T from "@material-ui/core/Typography"

class TestPlan extends React.Component {
  assemble = new Assemble("http://localhost:3000")

  recordedResults = 0

  state = {
    specs: [],
  }

  componentDidMount() {
    this.assemble.watch("slim")`
      select * from specification
      where partno = '${this.props.part_number}'
    `((specs) => {
      this.setState({ specs: csvParse(specs) })
    })
  }

  render() {
    return (
      <div>
        {this.state.specs.length === 0
         ? <T>No plan has been defined for part {this.props.part_number} yet.</T>
         : this.state.specs.map((spec) => (
            <TestSpecification
              key={`${this.props.sample_id}-${spec.test_name}`}
              user={this.props.user}
              sample_id={this.props.sample_id}
              name={spec.test_name}
              method={spec.test_method}
              criteria={spec.criteria}
              judgement={spec.judgement}
              onComplete={() => this.recordResult()}
            />
          ))
        }
      </div>
    )
  }

  recordResult() {
    this.recordedResults += 1

    if(this.recordedResults === this.state.specs.length) {
      this.props.onSampleCompleted(this.props.sample_id)
    }
  }
}

export default TestPlan
