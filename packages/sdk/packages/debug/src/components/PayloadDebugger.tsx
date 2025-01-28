import { Chip, TextField } from '@mui/material'
import { ErrorRender } from '@xylabs/react-error'
import { FlexCol } from '@xylabs/react-flexbox'
import { JsonViewerEx } from '@xyo-network/react-payload-raw-info'
import { usePayloadRootHash, useValidatedPayload } from '@xyo-network/react-shared'
import React, { useState } from 'react'

export const PayloadDebugger: React.FC = () => {
  const [input, setInput] = useState<string>()
  const { payload, error } = useValidatedPayload(input)
  const rootHash = usePayloadRootHash(payload)
  const dataHash = usePayloadRootHash(payload)

  return (
    <FlexCol>
      <h2>Payload Debugger</h2>
      <TextField defaultValue="" multiline name="payload" onChange={e => setInput(e.target.value)} />
      <JsonViewerEx value={payload} />
      <ErrorRender error={error} />
      <Chip label={`Root Hash: ${rootHash}`} />
      <Chip label={`Data Hash: ${dataHash}`} />
    </FlexCol>
  )
}
