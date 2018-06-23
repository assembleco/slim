import React from 'react';
import styled from "styled-components"

import T from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"

import NewSpecForm from "./NewSpecForm"

import "bootstrap/dist/css/bootstrap.min.css"
import Table from "react-bootstrap-table-next"
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

class Specify extends React.Component {
  removeFormatter = (cell, row) => (
    <Button color="secondary" onClick={() => this.props.onRemoveSpec(cell)}>
      Remove
    </Button>
  )

  specColumns = [
    { dataField: "partno", text: "Part" },
    { dataField: "test_name", text: "Test" },
    { dataField: "test_method", text: "Method" },
    { dataField: "criteria", text: "Criteria" },
    { dataField: "judgement", text: "Judgement Logic" },
    { dataField: "created_by", text: "Created By" },
    { dataField: "created_at", text: "Created At" },
    { dataField: "id", text: "", formatter: this.removeFormatter },
  ]

  render = () => (
    <Layout>
      <h2>Active Specs</h2>

      <Table keyField="id" data={this.props.specifications} columns={this.specColumns} />

      <h3>Add a new spec</h3>

      {this.props.samples.length > 0
        ? <T align="left">
            {this.props.samples.length}{" "}
            sample{this.props.samples.length === 1 ? null : "s"}{" "}
            in the lab{" "}
            {this.props.samples.length === 1 ? "has" : "have" }{" "}
            no defined testing plan:
          </T>
        : null
      }

      <ul>
        {this.props.samples.map((sample) => (
          <li key={sample.id}>{sample.id} (Part {sample.partno})</li>
        ))}
      </ul>

      <NewSpecForm onCreateSpecification={this.props.onCreateSpecification} />
    </Layout>
  )
}

const Layout = styled.div`
`

export default Specify
