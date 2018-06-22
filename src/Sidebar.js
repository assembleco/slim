import React from 'react';
import { Link } from "react-router-dom"
import styled from "styled-components"
import T from "@material-ui/core/Typography"
import Comment from "./Comment"

const Sidebar = ({ user, onSignOut, onReset }) => (
  <Layout>
    {user
      ? <SessionInfo>
          <T>Signed in as {user.name}</T>
          <Layout.Link to="#" onClick={() => onSignOut()}>
            Sign out
          </Layout.Link>
        </SessionInfo>
      : <Layout.Link to="/sign_in">Sign in</Layout.Link>
    }

    <Comment source={`
Test this system with these samples:

* \`q123456\`
* \`q234567\`
* \`q345678\`
* \`q456789\`
* \`q567890\`
    `}>
      <Link to="#" onClick={onReset}>Reset demo</Link>
    </Comment>
  </Layout>
)

const Layout = styled.div`
  background-color: rgb(98, 165, 226);
  color: white;
  text-align: center;
  padding-top: 2rem;
`

const SessionInfo = styled.div`
margin-bottom: 4rem;
`

Layout.Link = styled(Link)`
  color: white;
`

export default Sidebar
