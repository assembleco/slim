import React from 'react';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';

class Steps extends React.Component {
  state = {
    activeStep: 0,
  };

  render() {
    return (
      <Stepper alternativeLabel nonLinear activeStep={this.state.activeStep}>
        {this.props.steps.map((label, index) => {
          return (
            <Step key={label}>
              <StepButton
                onClick={() => this.setState({ activeStep: index })}
              >
                {label}
              </StepButton>
            </Step>
          );
        })}
      </Stepper>
    );
  }
}

export default Steps
