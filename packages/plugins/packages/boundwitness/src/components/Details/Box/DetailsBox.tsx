import { Divider } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { BoundWitness, BoundWitnessSchema } from '@xyo-network/boundwitness-model'
import { PayloadWrapper } from '@xyo-network/payload-wrapper'
import { PayloadDetailsRenderProps } from '@xyo-network/react-payload-plugin'
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

const BoundWitnessDetailsBox = forwardRef<HTMLDivElement, PayloadDetailsRenderProps & FlexBoxProps>(({ visibleRows, ...props }, ref) => {
  return (
    <TableHeightProvider defaultVisibleRows={visibleRows} additionalRows={1}>
      <BoundWitnessDetailsBoxInner ref={ref} {...props} />
    </TableHeightProvider>
  )
})

BoundWitnessDetailsBox.displayName = 'BoundWitnessDetailsBox'

const BoundWitnessDetailsBoxInner = forwardRef<HTMLDivElement, PayloadDetailsRenderProps & FlexBoxProps>(({ payload, ...props }, ref) => {
  const boundwitness = payload as BoundWitness
  const { hash } = payload ? new PayloadWrapper(payload) : { hash: '' }

  const hasBWPayloads = useMemo(
    () => (boundwitness ? boundwitness.payload_schemas.some((schema) => schema === BoundWitnessSchema) : false),
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
