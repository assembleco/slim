import React from "react"

class BarcodeField extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      timer: null,
      value: "",
    }
  }

  render() {
    return (
      <input
        type="text"
        ref={(element) => { this.field = element } }
        value={this.state.value}
        onChange={(e) => {
          clearTimeout(this.state.timer)
          this.setState({
            value: e.target.value,
            timer: setTimeout(this.submit.bind(this), 500),
          })
        }}
      />
    )
  }

  submit() {
    this.props.onScan(this.state.value)
    this.setState({ value: "", timer: null })
  }

  componentDidMount() {
    if(this.props.focus)
      this.field.focus()
  }
}

export default BarcodeField
