import React from "react"
import styled from "styled-components";
import ReactMarkdown from "react-markdown"

const Comment = ({ source }) => (
  <Layout>
    <ReactMarkdown source={source} />
  </Layout>
)

const Layout = styled.div`
  background-color: #ffe263;
  border: 1px solid #d1b94f;
  display: inline-block;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
`

export default Comment
