import React from 'react';
import styled from "styled-components"

import T from "@material-ui/core/Typography"
import NewSpecForm from "./NewSpecForm"

const Specify = ({ samples, onCreateSpecification, specifications }) => (
  <Layout>
    <h2>Add a new spec</h2>

    {samples.length > 0
      ? <T align="left">
          {samples.length}{" "}
          sample{samples.length === 1 ? null : "s"}{" "}
          in the lab{" "}
          {samples.length === 1 ? "has" : "have" }{" "}
          no defined testing plan:
        </T>
      : null
    }

    <ul>
      {samples.map((sample) => (
        <li key={sample.id}>{sample.id} (Part {sample.partno})</li>
      ))}
    </ul>

    <NewSpecForm onCreateSpecification={onCreateSpecification} />

    <h2>Testing Specs</h2>

    {specifications.map((spec) => (
      <Spec key={spec.id}>
        {[
          "partno", "test_name", "test_method", "criteria", "judgement", "created_by", "created_at"
        ].map((key) => (
          <li key={key}>{key}: {spec[key]}</li>
        ))}
      </Spec>
    ))}
  </Layout>
)

const Layout = styled.div`
`

const Spec = styled.ul`
  margin-bottom: 1rem;
`

export default Specify
