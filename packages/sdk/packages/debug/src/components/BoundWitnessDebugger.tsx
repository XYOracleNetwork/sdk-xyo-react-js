import {
  FormControl, Grid2,
  TextField,
} from '@mui/material'
import { ErrorRender } from '@xylabs/react-error'
import { FlexCol } from '@xylabs/react-flexbox'
import React, { useState } from 'react'

import { useDebugBoundWitness } from '../hooks/index.ts'
import { JsonPayloadLikeViewerEx, ValidationChips } from './shared/index.ts'

// eslint-disable-next-line @stylistic/max-len
const defaultBoundWitness = '{"$sourceQuery":"4668b65854019e2be3477ef64821d3634902a89e49150c94c6e2a75bc2d6458d","addresses":["1895c94d879586fce342ff4507a1c8ecc0d94d74"],"payload_hashes":["8551826d8e11ba065ab547a8e66b534efdc276b1be6119041bbaf3d69bebb8c1","d57d4ab772e1bdc1648c38e2cea7716f197e8ef503d615611f5708ce0d5c579c","cbaa3932580411cde85fda22ed6b532613a73c4ba4833ce298f73cb4a667ab92","364d4d4e29633b31a0d6924ce697ef9ae799e156794671c6bf0821380ca462d5","669ee43ad1e0b512579d531201f96958bbeae7a514b9dc3830f6c6eef4037686","4415a6863ed8ffbc086af5bde278a69dbb0384c93e45b11b0264a563b6c206ac","17c4ac3c9e8f1666321b7abd58b76d114219b17a8fcd17eeb4a11270e100db69","f0c6a68a1ddbcc6c5109d139367f9e6e14b5c2ec7f5aafd8e408de647ee6338f","1df4a80913ed0e18471c0edbac30eeac2470a49b40fb9719a27757ca946463b7","60d7361a72fec37a1c4dfe0a559cb076acd43ed3924115ba83954d32ea93714c"],"payload_schemas":["network.xyo.module.manifest","network.xyo.diviner.schema.stats.config","network.xyo.config","network.xyo.address","network.xyo.query","network.xyo.query","network.xyo.query","network.xyo.query","network.xyo.query","network.xyo.module.description"],"previous_hashes":["a5d24d97867fd13251cae9bad7a7bd73d6bc8ab7490aac9612b75bad961e9bd9"],"schema":"network.xyo.boundwitness","$signatures":["af83f4d2e875648e511fc65f7d87c681a2b683bdf3085e4361dfccb90c56afd44ea56df398ded89c224519856ecf2973ea43999fc9723d43703af89b1d758b37"]}'

export const BoundWitnessDebugger: React.FC = () => {
  const [input, setInput] = useState<string>(defaultBoundWitness)

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
