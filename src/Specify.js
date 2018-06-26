import React from 'react';
import styled from "styled-components"

import T from "@material-ui/core/Typography"
import { Link } from "react-router-dom"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Card from "@material-ui/core/Card"
import Button from "@material-ui/core/Button"

import NewSpecForm from "./NewSpecForm"

import "bootstrap/dist/css/bootstrap.min.css"
import Table from "react-bootstrap-table-next"
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

class Specify extends React.Component {
  state = { selectedPart: null }

  render = () => (
    <Layout>
      <Layout.Column>
        {this.props.partsWithoutSpecifications.length > 0
          ? <div>
              <h3>
                {this.props.partsWithoutSpecifications.length}{" "}
                part{this.props.partsWithoutSpecifications.length === 1 ? null : "s"}{" "}
                {this.props.partsWithoutSpecifications.length === 1 ? "has" : "have" }{" "}
                no specs:
              </h3>

              <ListCard>
                <List>
                  {this.props.partsWithoutSpecifications.map((part, index) => (
                    <ListItem
                      button
                      divider={index !== this.props.partsWithoutSpecifications.length - 1}
                      key={part.partno}
                      onClick={() => this.setState({ selectedPart: part.partno }) }
                    >
                      <ListItemText primary={part.item} secondary={`Part ${part.partno}`} />
                    </ListItem>
                  ))}
                </List>
              </ListCard>
            </div>
          : null
        }

        {this.props.partsWithSpecifications.length > 0
          ? <div>
              <h3>
                {this.props.partsWithSpecifications.length}{" "}
                part{this.props.partsWithSpecifications.length === 1 ? null : "s"}{" "}
                {this.props.partsWithSpecifications.length === 1 ? "has" : "have" }{" "}
                specs:
              </h3>

                <ListCard>
                <List>
                  {this.props.partsWithSpecifications.map((part, index) => (
                    <ListItem
                      button
                      divider={index !== this.props.partsWithSpecifications.length - 1}
                      key={part.partno}
                      onClick={() => this.setState({ selectedPart: part.partno }) }
                    >
                      <ListItemText primary={part.item} secondary={`Part ${part.partno}`} />
                    </ListItem>
                  ))}
                </List>
              </ListCard>
            </div>
          : null
        }
      </Layout.Column>

      <Layout.Column>
        {this.state.selectedPart
        ? <div>
            <h2>Spec for Part #{this.state.selectedPart}</h2>

            <Table
              keyField="id"
              data={this.props.specifications.filter((spec) => (
                spec.partno === this.state.selectedPart
              ))}
              columns={this.tableColumns}
            />

            <NewSpecForm
              prefilledPartNumber={this.state.selectedPart}
              onCreateSpecification={this.props.onCreateSpecification}
            />
          </div>
        : <div>
            <T>Select a part to see its testing plan.</T>
            <T>
              You may need to <Link to="/receive">scan some items into the system</Link>{" "}
              if there aren't any already.
            </T>
          </div>
        }
      </Layout.Column>
    </Layout>
  )

  removeFormatter = (cell, row) => (
    <Button color="secondary" onClick={() => this.props.onRemoveSpec(cell)}>
      Remove
    </Button>
  )

  judgementFormatter = (cell, row) => (
    <code>{cell}</code>
  )

  judgementHeader = (column, colIndex) => (
    <span>
    {column.text} (in <a href="https://www.ruby-lang.org/en/documentation/quickstart/">Ruby</a>)
    </span>
  )

  tableColumns = [
    { dataField: "test_name", text: "Test" },
    { dataField: "test_method", text: "Method" },
    { dataField: "criteria", text: "Criteria" },
    { dataField: "judgement", text: "Judgement Logic", headerFormatter: this.judgementHeader, formatter: this.judgementFormatter },
    { dataField: "id", text: "", formatter: this.removeFormatter },
  ]
}

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-column-gap: 1rem;
`

Layout.Column = styled.div`
`

const ListCard = styled(Card)`
margin-bottom: 2rem;
`

export default Specify
