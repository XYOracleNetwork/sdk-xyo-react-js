import { Button, TextField } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'
import { XyoPayload, XyoPayloadBuilder } from '@xyo-network/payload'
import { useState } from 'react'

import { useNodeQueryDiviner } from '../contexts'

export const NodeQueryDiviner: React.FC = () => {
  const [query, setQuery] = useState<XyoPayload>()
  const [address, setAddress] = useState('')
  const [result, error] = useNodeQueryDiviner('AddressHistoryDiviner', query)

  const onClick = () => {
    const query = new XyoPayloadBuilder({ schema: 'network.xyo.diviner.address.query' }).fields({ address }).build()
    setQuery(query)
  }

  return (
    <FlexCol rowGap={2}>
      <TextField placeholder="Address on localhost" onChange={(event) => setAddress(event.target.value)} />
      <Button disabled={!address} variant={'contained'} onClick={onClick}>
        divine
      </Button>
      <code style={{ overflowWrap: 'anywhere' }}>{JSON.stringify(result, null, 2)}</code>
      <code style={{ overflowWrap: 'anywhere' }}>{JSON.stringify(error, null, 2)}</code>
    </FlexCol>
  )
}
