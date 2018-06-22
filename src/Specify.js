import React from 'react';
import styled from "styled-components"

import T from "@material-ui/core/Typography"
import NewSpecForm from "./NewSpecForm"

import "bootstrap/dist/css/bootstrap.min.css"
import Table from "react-bootstrap-table-next"
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

let specColumns = [
  { dataField: "partno", text: "Part" },
  { dataField: "test_name", text: "Test" },
  { dataField: "test_method", text: "Method" },
  { dataField: "criteria", text: "Criteria" },
  { dataField: "judgement", text: "Judgement Logic" },
  { dataField: "created_by", text: "Created By" },
  { dataField: "created_at", text: "Created At" },
]

const Specify = ({ samples, onCreateSpecification, specifications }) => (
  <Layout>
    <h2>Active Specs</h2>

    <Table keyField="id" data={specifications} columns={specColumns} />

    <h3>Add a new spec</h3>

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
  </Layout>
)

const Layout = styled.div`
`

export default Specify
