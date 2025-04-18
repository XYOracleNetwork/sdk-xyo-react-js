import { ButtonGroup, Typography } from '@mui/material'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { ButtonEx } from '@xylabs/react-button'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexCol } from '@xylabs/react-flexbox'
import { ArchivistClearQuerySchema, ArchivistCommitQuerySchema } from '@xyo-network/archivist-model'
import { QueryBoundWitnessBuilder } from '@xyo-network/boundwitness-builder'
import type { Payload } from '@xyo-network/payload-model'
import React, { useState } from 'react'

import { useWeakArchivistFromNode } from '../../hooks/index.ts'

const testQueryCommit = { schema: ArchivistCommitQuerySchema }
const testQueryCommitBoundWitnessBuilder = new QueryBoundWitnessBuilder().query(testQueryCommit)

const testQueryClear = { schema: ArchivistClearQuerySchema }
const testQueryClearBoundWitnessBuilder = new QueryBoundWitnessBuilder().query(testQueryClear)

export interface ArchivistDetailsProps extends FlexBoxProps {
  address?: string
}

export const ArchivistDetails: React.FC<ArchivistDetailsProps> = ({ address, ...props }) => {
  const [archivist] = useWeakArchivistFromNode(address)
  const [payloads, setPayloads] = useState<Payload[]>()
  const [refresh, setRefresh] = useState(0)
  const [queryableCommit, setQueryableCommit] = useState(false)
  const [queryableClear, setQueryableClear] = useState(false)

  useAsyncEffect(
    async () => {
      const instance = archivist?.deref()
      if (instance) {
        const [commitBW] = await testQueryCommitBoundWitnessBuilder.build()
        const [clearBW] = await testQueryClearBoundWitnessBuilder.build()
        setQueryableCommit(await instance?.queryable(commitBW, [testQueryCommit]))
        setQueryableClear(await instance?.queryable(clearBW, [testQueryClear]))
      }
    },
    [archivist],
  )

  useAsyncEffect(
    async (mounted) => {
      const payloads = await archivist?.deref()?.all?.()
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
        <ButtonEx disabled={payloads?.length === 0 || !archivist || !queryableCommit} onClick={() => archivist?.deref()?.commit?.()}>
          Commit
        </ButtonEx>
        <ButtonEx disabled={!archivist || !queryableClear} onClick={() => archivist?.deref()?.clear?.()}>
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
