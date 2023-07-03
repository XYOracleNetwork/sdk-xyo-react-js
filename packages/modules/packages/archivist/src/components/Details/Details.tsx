import { ButtonGroup, Typography } from '@mui/material'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { ButtonEx } from '@xylabs/react-button'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { ArchivistClearQuerySchema, ArchivistCommitQuerySchema } from '@xyo-network/archivist'
import { ArchivistWrapper } from '@xyo-network/archivist-wrapper'
import { QueryBoundWitnessBuilder } from '@xyo-network/module'
import { Payload } from '@xyo-network/payload-model'
import { useWrapperAccount } from '@xyo-network/react-wallet'
import { useEffect, useState } from 'react'

import { useArchivistFromNode } from '../../hooks'

const testQueryCommit = { schema: ArchivistCommitQuerySchema }
const testQueryCommitBoundWitnessBuilder = new QueryBoundWitnessBuilder({ inlinePayloads: true }).query(testQueryCommit)

const testQueryClear = { schema: ArchivistClearQuerySchema }
const testQueryClearBoundWitnessBuilder = new QueryBoundWitnessBuilder({ inlinePayloads: true }).query(testQueryClear)

export interface ArchivistDetails extends FlexBoxProps {
  address?: string
}

export const ArchivistDetails: React.FC<ArchivistDetails> = ({ address, ...props }) => {
  const [archivist] = useArchivistFromNode(address)
  const [payloads, setPayloads] = useState<Payload[]>()
  const [refresh, setRefresh] = useState(0)
  const [wrapper, setWrapper] = useState<ArchivistWrapper>()
  const [queryableCommit, setQueryableCommit] = useState(false)
  const [queryableClear, setQueryableClear] = useState(false)
  const [wrapperWallet] = useWrapperAccount()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      if (archivist) {
        const [commitBW] = await testQueryCommitBoundWitnessBuilder.build()
        const [clearBW] = await testQueryClearBoundWitnessBuilder.build()
        setQueryableCommit(await archivist?.queryable(commitBW, [testQueryCommit]))
        setQueryableClear(await archivist?.queryable(clearBW, [testQueryClear]))
      }
    },
    [archivist],
  )

  useEffect(() => {
    setWrapper(archivist && wrapperWallet ? ArchivistWrapper.wrap(archivist, wrapperWallet) : undefined)
  }, [archivist, wrapperWallet])

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const payloads = await wrapper?.all()
      if (mounted()) {
        setPayloads(payloads)
      }
    },
    [wrapper, refresh],
  )

  return (
    <FlexCol {...props}>
      <Typography>{`Payloads: ${payloads ? payloads.length : '-'}`}</Typography>
      <ButtonGroup>
        <ButtonEx disabled={payloads?.length === 0 || !archivist || !queryableCommit} onClick={() => wrapper?.commit()}>
          Commit
        </ButtonEx>
        <ButtonEx disabled={!archivist || !queryableClear} onClick={() => wrapper?.clear()}>
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
