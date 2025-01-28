import { TextField } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'
import { JsonViewerEx } from '@xyo-network/react-payload-raw-info'
import React, { useState } from 'react'

export const PayloadDebugger: React.FC = () => {
  const [payload, setPayload] = useState<string>()
  return (
    <FlexCol>
      <h2>Payload Debugger</h2>
      <TextField multiline name="payload" onChange={e => setPayload(e.target.value)} />
      <JsonViewerEx value={payload} />
    </FlexCol>
  )
}
