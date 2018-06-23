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
            label="Accupac Badge Number"
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
    ldapsearch
      -H ldap://{{{host}}}:{{{port}}}
      -D '{{{domain}}}\\${this.state.username}'
      -w '${this.state.password}'
      -b '{{{base}}}'
      '{{{username_field}}}=${this.state.username}'
      sAMAccountName mail givenname sn mailnickname
    `
    .then(this.parseLDAPResultForUserInfo)
    .then(this.props.onSignIn)
  }

  parseLDAPResultForUserInfo(ldapResult) {
    return ldapResult
      .split("\n")
      .filter((line) => !line.match(/^#/))
      .filter((line) => (line !== ""))
      .filter((line) => !line.match(/^search: \d/))
      .filter((line) => !line.match(/^result: \d/))
      .map((line) => { let [key, val] = line.split(": "); return { [key]: val }})
      .reduce((obj, next) => ({ ...obj, ...next }))
  }

  componentWillUnmount() {
    this.assemble.destruct()
  }
}

const Form = styled.div`
display: flex;
flex-direction: column;
`

export default SignIn
