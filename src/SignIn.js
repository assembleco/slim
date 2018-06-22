import React from "react"
import styled from "styled-components"
import Assemble from "./Assemble"

import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { Redirect } from "react-router-dom"

class SignIn extends React.Component {
  assemble = new Assemble("http://localhost:3000")

  state = {
    username: "",
    password: "",
  }

  render() {
    if(this.props.user) {
      return <Redirect to="/" />
    }

    return (
      <div>
        <h1>Sign In</h1>

        <Form>
          <TextField
            label="Accupac Username"
            value={this.state.username}
            onChange={(e) => this.setState({ username: e.target.value })}
          />

          <TextField
            label="Password"
            type="password"
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
          />

          <Button onClick={() => this.signin()} >
            Sign In
          </Button>
        </Form>
      </div>
    )
  }

  signin() {
    this.assemble.run("ActiveDirectory")`
    ldapsearch -H ldaps://${this.props.host}:${this.props.port} -D "${this.props.bind_dn}" -y bind_dn_password.txt  -b "${this.props.base}" "${this.props.user_filter}" sAMAccountName
    `
    .then(this.parseLDAPResultForUserInfo)
    .then(stubUserInfo)
    .then(this.props.onSignIn)
  }

  parseLDAPResultForUserInfo(ldapResult) {
    // TODO
  }
}

const stubUserInfo = () => {
  return {
    id: 1360,
    username: "gwright",
    name: "G Wright",
  }
}

const Form = styled.div`
display: flex;
flex-direction: column;
`

export default SignIn
