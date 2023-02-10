import { Divider } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { XyoBoundWitness, XyoBoundWitnessSchema } from '@xyo-network/boundwitness-model'
import { PayloadWrapper } from '@xyo-network/payload-wrapper'
import { XyoPayloadDetailsRenderProps } from '@xyo-network/react-payload-plugin'
import { TableHeightProvider } from '@xyo-network/react-table'
import { forwardRef, useMemo } from 'react'
import { FaSignature } from 'react-icons/fa'
import { VscSymbolMethod, VscSymbolNamespace } from 'react-icons/vsc'

import {
  BoundWitnessPayloadsTable,
  BoundWitnessPayloadsTableForBWs,
  BoundWitnessSignatureTable,
  BWActions,
  HashHeadingPaper,
  HeadingPaper,
} from '../../_shared'

const BoundWitnessDetailsBox = forwardRef<HTMLDivElement, XyoPayloadDetailsRenderProps & FlexBoxProps>(({ visibleRows, ...props }, ref) => {
  return (
    <TableHeightProvider defaultVisibleRows={visibleRows} additionalRows={1}>
      <BoundWitnessDetailsBoxInner ref={ref} {...props} />
    </TableHeightProvider>
  )
})

BoundWitnessDetailsBox.displayName = 'BoundWitnessDetailsBox'

const BoundWitnessDetailsBoxInner = forwardRef<HTMLDivElement, XyoPayloadDetailsRenderProps & FlexBoxProps>(({ payload, ...props }, ref) => {
  const boundwitness = payload as XyoBoundWitness
  const { hash } = payload ? new PayloadWrapper(payload) : { hash: '' }

  const hasBWPayloads = useMemo(
    () => (boundwitness ? boundwitness.payload_schemas.some((schema) => schema === XyoBoundWitnessSchema) : false),
    [boundwitness],
  )

  return (
    <FlexCol alignItems="stretch" rowGap={4} ref={ref} {...props}>
      <HashHeadingPaper
        hash={hash}
        paperProps={{
          sx: { p: 2 },
        }}
        AdornmentEnd={<BWActions boundwitness={boundwitness} />}
        identiconProps={{ p: 0.75, size: 24 }}
      />
      <Divider flexItem />
      <FlexCol alignItems="stretch" rowGap={1} mb={1}>
        <HeadingPaper IconComponent={<VscSymbolNamespace />} heading={'Payloads'} />
        <BoundWitnessPayloadsTable boundwitness={boundwitness} />
      </FlexCol>
      {hasBWPayloads ? (
        <FlexCol alignItems="stretch" rowGap={1} mb={1}>
          <HeadingPaper IconComponent={<VscSymbolMethod />} heading={'Bound Witnesses'} />
          <BoundWitnessPayloadsTableForBWs boundwitness={boundwitness} />
        </FlexCol>
      ) : null}
      <FlexCol alignItems="stretch" rowGap={1} mb={1}>
        <HeadingPaper IconComponent={<FaSignature />} heading={'Signatures'} />
        <BoundWitnessSignatureTable block={boundwitness} />
      </FlexCol>
    </FlexCol>
  )
})

BoundWitnessDetailsBoxInner.displayName = 'BoundWitnessDetailsBoxInner'

export { BoundWitnessDetailsBox }
