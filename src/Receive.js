import React from "react"
import styled from "styled-components";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import T from '@material-ui/core/Typography';

import { BarcodeScan } from "mdi-material-ui"
import BarcodeField from "./BarcodeField"
import Comment from "./Comment"

const Receive = ({samples, onReceive}) => (
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
* \`q345679\`
* \`q456789\`
* \`q567890\`
    `} />

    {samples.length > 0
      &&
      <Card>
        {samples.map((sample) => (
          [
            <Sample key={sample.id}>
              <div>
                <T variant="caption" align="left">
                  {sample.customer}
                </T>

                <T variant="title" align="left">
                  {sample.item}
                </T>
              </div>

              <div>
                <T variant="caption" align="right">
                  Part {sample.partno}
                </T>

                <T variant="subheading" align="right">
                  {sample.id.toUpperCase()}
                </T>
              </div>
            </Sample>,
            <Divider key={`divider-${sample.id}`}/>,
          ]
        ))}
      </Card>
    }
  </Layout>
)

const Layout = styled.div`
  text-align: center;
`

const Sample = styled(CardContent)`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const Media = {}
Media.BarcodeScan = styled(BarcodeScan)`
height: 8rem !important;
width: 8rem !important;
`

export default Receive
