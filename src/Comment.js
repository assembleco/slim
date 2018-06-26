import React from "react"
import styled from "styled-components";
import ReactMarkdown from "react-markdown"

const Comment = ({ source, children }) => (
  <Layout>
    <ReactMarkdown source={source} />
    {children}
  </Layout>
)

const Layout = styled.div`
  background-color: #ffe263;
  border: 1px solid #d1b94f;
  color: #606060;
  display: inline-block;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
`

export default () => ( null )
