import React from "react"
import styled from "styled-components";

import { BarcodeScan } from "mdi-material-ui"
import BarcodeField from "./BarcodeField"

const Receive = ({onReceive}) => (
  <Layout>
    <Media.BarcodeScan />

    <p>Scan a barcode to begin.</p>
    <p>
      <BarcodeField focus onScan={(value) => onReceive(value)} />
    </p>
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
