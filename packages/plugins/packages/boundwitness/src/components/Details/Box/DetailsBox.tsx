import { Divider } from '@mui/material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexCol } from '@xylabs/react-flexbox'
import type { BoundWitness } from '@xyo-network/boundwitness-model'
import { BoundWitnessSchema } from '@xyo-network/boundwitness-model'
import type { PayloadDetailsListRenderProps, PayloadDetailsRenderProps } from '@xyo-network/react-payload-plugin'
import { usePayloadHash } from '@xyo-network/react-shared'
import { TableHeightProvider } from '@xyo-network/react-table'
import React, { useMemo } from 'react'
// eslint-disable-next-line import-x/no-internal-modules
import { FaSignature } from 'react-icons/fa'
// eslint-disable-next-line import-x/no-internal-modules
import { VscSymbolMethod, VscSymbolNamespace } from 'react-icons/vsc'

import {
  BoundWitnessPayloadsTable,
  BoundWitnessPayloadsTableForBWs,
  BoundWitnessSignatureTable,
  BWActions,
  HashHeadingPaper,
  HeadingPaper,
} from '../../_shared/index.ts'

const BoundWitnessDetailsBox: React.FC<PayloadDetailsListRenderProps & FlexBoxProps> = ({ visibleRows, ...props }) => {
  return (
    <TableHeightProvider defaultVisibleRows={visibleRows} additionalRows={1}>
      <BoundWitnessDetailsBoxInner {...props} />
    </TableHeightProvider>
  )
}

BoundWitnessDetailsBox.displayName = 'BoundWitnessDetailsBox'

const BoundWitnessDetailsBoxInner: React.FC<PayloadDetailsRenderProps & FlexBoxProps> = ({ payload, ...props }) => {
  const boundWitness = payload as BoundWitness
  const partialBoundWitness = boundWitness as Partial<BoundWitness>
  const hash = usePayloadHash(payload)

  const hasBWPayloads = useMemo(() => (partialBoundWitness ? partialBoundWitness.payload_schemas?.includes(BoundWitnessSchema) : false), [partialBoundWitness])

  return (
    <FlexCol alignItems="stretch" rowGap={4} {...props}>
      <HashHeadingPaper
        hash={hash}
        paperProps={{ sx: { p: 2 } }}
        AdornmentEnd={<BWActions boundwitness={boundWitness} />}
        identiconProps={{ p: 0.75, size: 24 }}
      />
      <Divider flexItem />
      <FlexCol alignItems="stretch" rowGap={1} mb={1}>
        <HeadingPaper IconComponent={<VscSymbolNamespace />} heading="Payloads" />
        <BoundWitnessPayloadsTable boundwitness={boundWitness} />
      </FlexCol>
      {hasBWPayloads
        ? (
            <FlexCol alignItems="stretch" rowGap={1} mb={1}>
              <HeadingPaper IconComponent={<VscSymbolMethod />} heading="Bound Witnesses" />
              <BoundWitnessPayloadsTableForBWs boundwitness={boundWitness} />
            </FlexCol>
          )
        : null}
      <FlexCol alignItems="stretch" rowGap={1} mb={1}>
        <HeadingPaper IconComponent={<FaSignature />} heading="Signatures" />
        <BoundWitnessSignatureTable block={boundWitness} />
      </FlexCol>
    </FlexCol>
  )
}

BoundWitnessDetailsBoxInner.displayName = 'BoundWitnessDetailsBoxInner'

export { BoundWitnessDetailsBox }
