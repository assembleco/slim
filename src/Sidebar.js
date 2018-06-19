import React from 'react';
import { Link } from "react-router-dom"
import styled from "styled-components"
import T from "@material-ui/core/Typography"

const Sidebar = ({ user, onSignOut }) => (
  <Layout>
    {user
      ? <div>
          <T>Signed in as {user.name}</T>
          <Layout.Link to="#" onClick={() => onSignOut()}>
            Sign out
          </Layout.Link>
        </div>
      : <Layout.Link to="/sign_in">Sign in</Layout.Link>
    }
  </Layout>
)

const Layout = styled.div`
  background-color: rgb(98, 165, 226);
  color: white;
  text-align: center;
  padding-top: 2rem;
`

Layout.Link = styled(Link)`
  color: white;
`

export default Sidebar
