import { ButtonGroup, Typography } from '@mui/material'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { ButtonEx } from '@xylabs/react-button'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { ArchivistClearQuerySchema, ArchivistCommitQuerySchema } from '@xyo-network/archivist'
import { QueryBoundWitnessBuilder } from '@xyo-network/boundwitness-builder'
import { Payload } from '@xyo-network/payload-model'
import { useState } from 'react'

import { useArchivistFromNode } from '../../hooks'

const testQueryCommit = { schema: ArchivistCommitQuerySchema }
const testQueryCommitBoundWitnessBuilder = new QueryBoundWitnessBuilder().query(testQueryCommit)

const testQueryClear = { schema: ArchivistClearQuerySchema }
const testQueryClearBoundWitnessBuilder = new QueryBoundWitnessBuilder().query(testQueryClear)

export interface ArchivistDetails extends FlexBoxProps {
  address?: string
}

export const ArchivistDetails: React.FC<ArchivistDetails> = ({ address, ...props }) => {
  const [archivist] = useArchivistFromNode(address)
  const [payloads, setPayloads] = useState<Payload[]>()
  const [refresh, setRefresh] = useState(0)
  const [queryableCommit, setQueryableCommit] = useState(false)
  const [queryableClear, setQueryableClear] = useState(false)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      if (archivist) {
        const [commitBW] = await (await testQueryCommitBoundWitnessBuilder).build()
        const [clearBW] = await (await testQueryClearBoundWitnessBuilder).build()
        setQueryableCommit(await archivist?.queryable(commitBW, [testQueryCommit]))
        setQueryableClear(await archivist?.queryable(clearBW, [testQueryClear]))
      }
    },
    [archivist],
  )

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const payloads = await archivist?.all?.()
      if (mounted()) {
        setPayloads(payloads)
      }
    },
    [archivist, refresh],
  )

  return (
    <FlexCol {...props}>
      <Typography>{`Payloads: ${payloads ? payloads.length : '-'}`}</Typography>
      <ButtonGroup>
        <ButtonEx disabled={payloads?.length === 0 || !archivist || !queryableCommit} onClick={() => archivist?.commit?.()}>
          Commit
        </ButtonEx>
        <ButtonEx disabled={!archivist || !queryableClear} onClick={() => archivist?.clear?.()}>
          Clear
        </ButtonEx>
        <ButtonEx
          disabled={!archivist}
          onClick={() => {
            setRefresh(refresh + 1)
          }}
        >
          Refresh
        </ButtonEx>
      </ButtonGroup>
    </FlexCol>
  )
}
