import React from "react"
import styled from "styled-components";
import { Link } from "react-router-dom"

import { BarcodeScan } from "mdi-material-ui"

import Sample from "./Sample"
import BarcodeField from "./BarcodeField"

const Receive = ({ samples, onReceive, onReset }) => (
  <Layout>
    <Media.BarcodeScan />

    <p>Scan a barcode to begin.</p>
    <p>
      <BarcodeField focus onScan={(value) => onReceive(value)} />
    </p>

    {samples.map((sample) => (
      <Sample {...sample} key={sample.id} disabled >
        <Link to="/test">Test</Link>
      </Sample>
    ))}
  </Layout>
)

const Layout = styled.div`
  text-align: center;
`

const Media = {}
Media.BarcodeScan = styled(BarcodeScan)`
height: 8rem !important;
width: 8rem !important;
`

export default Receive
