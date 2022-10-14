import { ButtonGroup, Typography } from '@mui/material'
import { ButtonEx } from '@xylabs/react-button'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { useAsyncEffect } from '@xylabs/react-shared'
import { XyoArchivist, XyoArchivistClearQuerySchema, XyoArchivistCommitQuerySchema, XyoArchivistWrapper } from '@xyo-network/archivist'
import { XyoPayload } from '@xyo-network/payload'
import { useEffect, useState } from 'react'

import { useArchivist } from '../contexts'

export interface ArchivistDetails extends FlexBoxProps {
  archivist?: XyoArchivist
}

export const ArchivistDetails: React.FC<ArchivistDetails> = ({ archivist: archivistProp, ...props }) => {
  const { archivist = archivistProp } = useArchivist()
  const [payloads, setPayloads] = useState<(XyoPayload | null)[]>()
  const [refresh, setRefresh] = useState(0)
  const [wrapper, setWrapper] = useState<XyoArchivistWrapper>()

  useEffect(() => {
    setWrapper(archivist ? new XyoArchivistWrapper({ module: archivist }) : undefined)
  }, [archivist])

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const payloads = (await wrapper?.all()) ?? []
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
        <ButtonEx disabled={!archivist?.queryable(XyoArchivistCommitQuerySchema)} onClick={() => wrapper?.commit()}>
          Commit
        </ButtonEx>
        <ButtonEx disabled={archivist?.queryable(XyoArchivistClearQuerySchema)} onClick={() => wrapper?.clear()}>
          Clear
        </ButtonEx>
        <ButtonEx
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
