import {
  FormControl, Grid2, Paper, TextField, useTheme,
} from '@mui/material'
import { ErrorRender } from '@xylabs/react-error'
import { FlexCol } from '@xylabs/react-flexbox'
import { JsonViewerEx } from '@xyo-network/react-payload-raw-info'
import React, { useState } from 'react'

import { useDebugPayload } from '../hooks/index.ts'
import { ValidationChips } from './shared/index.ts'

const defaultPayload = '{ "schema": "network.xyo.test", "foo": true }'

export const PayloadDebugger: React.FC = () => {
  const theme = useTheme()
  const [input, setInput] = useState<string>(defaultPayload)

  const {
    payload, error, rootHash, dataHash, valid,
  } = useDebugPayload(input)

  return (
    <Grid2 container justifyContent="center">
      <Grid2
        size={{ xs: 12, sm: 6 }}
      >
        <FlexCol gap={2} width="100%" alignItems="start">
          <h2>Payload Debugger</h2>
          <FormControl fullWidth>
            <TextField value={input} multiline minRows={10} maxRows={Infinity} name="payload" onChange={e => setInput(e.target.value)} />
          </FormControl>
          {payload
            ? (
                <Paper sx={{ width: '100%', padding: theme.spacing(2) }}>
                  <JsonViewerEx value={payload} style={{ width: '100%' }} />
                </Paper>
              )
            : null}
          <ErrorRender error={error} />
          <ValidationChips valid={valid} rootHash={rootHash} dataHash={dataHash} />
        </FlexCol>
      </Grid2>
    </Grid2>
  )
}
