import {
  FormControl, Grid2,
  TextField,
} from '@mui/material'
import { ErrorRender } from '@xylabs/react-error'
import { FlexCol } from '@xylabs/react-flexbox'
import React, { useState } from 'react'

import { useDebugBoundWitness } from '../hooks/index.ts'
import { JsonPayloadLikeViewerEx, ValidationChips } from './shared/index.ts'

export interface BoundWitnessDebuggerProps {
  defaultBoundWitnessInput?: string
}

export const BoundWitnessDebugger: React.FC<BoundWitnessDebuggerProps> = ({ defaultBoundWitnessInput = '' }) => {
  const [input, setInput] = useState<string>(defaultBoundWitnessInput)

  const {
    boundWitness, errors, rootHash, dataHash, valid,
  } = useDebugBoundWitness(input)

  return (
    <Grid2 container justifyContent="center">
      <Grid2
        size={{ xs: 12, sm: 6 }}
      >
        <FlexCol gap={2} width="100%" alignItems="start">
          <h2>BoundWitness Debugger</h2>
          <FormControl fullWidth>
            <TextField value={input} multiline minRows={10} maxRows={Infinity} name="payload" onChange={e => setInput(e.target.value)} />
          </FormControl>
          <JsonPayloadLikeViewerEx value={boundWitness} />
          {errors.map(error => <ErrorRender key={error?.message} error={error} />)}
          <ValidationChips valid={valid} rootHash={rootHash} dataHash={dataHash} />
        </FlexCol>
      </Grid2>
    </Grid2>
  )
}
