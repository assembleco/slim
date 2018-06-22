import React from "react"
import styled from "styled-components";
import { Link } from "react-router-dom"

import { BarcodeScan } from "mdi-material-ui"

import Sample from "./Sample"
import BarcodeField from "./BarcodeField"
import Comment from "./Comment"

const Receive = ({ samples, onReceive, onReset }) => (
  <Layout>
    <Media.BarcodeScan />

    <p>Scan a barcode to begin.</p>
    <p>
      <BarcodeField focus onScan={(value) => onReceive(value)} />
    </p>

    <Comment source={`
To test out this system, copy & paste one of these:

* \`q123456\`
* \`q234567\`
* \`q345678\`
* \`q456789\`
* \`q567890\`
    `}>
      <Link to="#" onClick={onReset}>Reset demo</Link>
    </Comment>

    {samples.map((sample) => (
      <Sample {...sample} key={sample.id} disabled />
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
