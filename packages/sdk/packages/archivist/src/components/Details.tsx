import { ButtonGroup, Typography } from '@mui/material'
import { ButtonEx } from '@xylabs/react-button'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { useAsyncEffect } from '@xylabs/react-shared'
import { ArchivistClearQuerySchema, ArchivistCommitQuerySchema, ArchivistModule } from '@xyo-network/archivist'
import { ArchivistWrapper } from '@xyo-network/archivist-wrapper'
import { QueryBoundWitnessBuilder } from '@xyo-network/module'
import { XyoPayload } from '@xyo-network/payload-model'
import { useEffect, useState } from 'react'

import { useArchivist } from '../contexts'

const testQueryCommit = { schema: ArchivistCommitQuerySchema }
const testQueryCommitBoundWitness = new QueryBoundWitnessBuilder({ inlinePayloads: true }).query(testQueryCommit).build()

const testQueryClear = { schema: ArchivistClearQuerySchema }
const testQueryClearBoundWitness = new QueryBoundWitnessBuilder({ inlinePayloads: true }).query(testQueryClear).build()

export interface ArchivistDetails extends FlexBoxProps {
  archivist?: ArchivistModule
}

export const ArchivistDetails: React.FC<ArchivistDetails> = ({ archivist: archivistProp, ...props }) => {
  const { archivist = archivistProp } = useArchivist()
  const [payloads, setPayloads] = useState<XyoPayload[]>()
  const [refresh, setRefresh] = useState(0)
  const [wrapper, setWrapper] = useState<ArchivistWrapper>()
  const [queryableCommit, setQueryableCommit] = useState(false)
  const [queryableClear, setQueryableClear] = useState(false)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      if (archivist) {
        setQueryableCommit(await archivist?.queryable(testQueryCommitBoundWitness[0], [testQueryCommit]))
        setQueryableClear(await archivist?.queryable(testQueryClearBoundWitness[0], [testQueryClear]))
      }
    },
    [archivist],
  )

  useEffect(() => {
    setWrapper(archivist ? new ArchivistWrapper(archivist) : undefined)
  }, [archivist])

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
