import { observable } from "mobx"

class State {
  @observable receivedSamples = []
  @observable samplesForTesting = []
  @observable releasedSamples = []
  @observable samplesWithCompletedTests = []
  @observable partsWithoutSpecifications = []
  @observable partsWithSpecifications = []
  @observable specifications = []
  @observable user = undefined
}

export default State
