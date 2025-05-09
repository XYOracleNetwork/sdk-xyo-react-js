import {
  FormControl, Grid, TextField,
} from '@mui/material'
import { ErrorRender } from '@xylabs/react-error'
import { FlexCol } from '@xylabs/react-flexbox'
import React, { useState } from 'react'

import { useDebugPayload } from '../hooks/index.ts'
import { JsonPayloadLikeViewerEx, ValidationChips } from './shared/index.ts'

const defaultPayload = '{ "schema": "network.xyo.test", "foo": true }'

export const PayloadDebugger: React.FC = () => {
  const [input, setInput] = useState<string>(defaultPayload)

  const {
    payload, errors, rootHash, dataHash, valid,
  } = useDebugPayload(input)

  return (
    <Grid container justifyContent="center">
      <Grid
        size={{ xs: 12, sm: 6 }}
      >
        <FlexCol gap={2} width="100%" alignItems="start">
          <h2>Payload Debugger</h2>
          <FormControl fullWidth>
            <TextField value={input} multiline minRows={10} maxRows={Infinity} name="payload" onChange={e => setInput(e.target.value)} />
          </FormControl>
          <JsonPayloadLikeViewerEx value={payload} />
          {errors.map(error => <ErrorRender key={error?.message} error={error} />)}
          <ValidationChips valid={valid} rootHash={rootHash} dataHash={dataHash} />
        </FlexCol>
      </Grid>
    </Grid>
  )
}
