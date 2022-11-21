import { Card } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { XyoPayloadDetailsRenderProps } from '@xyo-network/react-payload-plugin'
import { TableHeightProvider, useTableHeight } from '@xyo-network/react-table'
import { forwardRef, useState } from 'react'

import { BoundWitnessPayloadsTable, BoundWitnessPayloadsTableForBWs, BoundWitnessSignatureTable } from '../../_shared'
import { BoundWitnessCardHeader } from '../../Card'
import { BoundWitnessBottomNavigation } from '../Box'

const BoundWitnessDetailsCard = forwardRef<HTMLDivElement, XyoPayloadDetailsRenderProps>(({ visibleRows, ...props }, ref) => {
  return (
    <TableHeightProvider defaultVisibleRows={visibleRows} additionalRows={1}>
      <BoundWitnessDetailsCardInner ref={ref} {...props} />
    </TableHeightProvider>
  )
})

BoundWitnessDetailsCard.displayName = 'BoundWitnessDetailsCard'

export { BoundWitnessDetailsCard }

const BoundWitnessDetailsCardInner = forwardRef<HTMLDivElement, XyoPayloadDetailsRenderProps>(({ payload, active, ...props }, ref) => {
  const boundwitness = payload as XyoBoundWitness
  const { height } = useTableHeight()
  const [activeTab, setActiveTab] = useState(0)

  return (
    <Card ref={ref} {...props}>
      <BoundWitnessCardHeader payload={payload} active={active} />
      <FlexCol alignItems="stretch" ref={ref} {...props}>
        <FlexCol alignItems="stretch" justifyContent="start" height={height !== undefined ? height : 'auto'} overflow="scroll">
          {activeTab === 0 ? <BoundWitnessPayloadsTable boundwitness={boundwitness} variant="scrollable" /> : null}
          {activeTab === 1 ? <BoundWitnessPayloadsTableForBWs boundwitness={boundwitness} variant="scrollable" /> : null}
          {activeTab === 2 ? <BoundWitnessSignatureTable block={boundwitness} variant="scrollable" /> : null}
        </FlexCol>
        <BoundWitnessBottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} boundWitness={boundwitness} />
      </FlexCol>
    </Card>
  )
})

BoundWitnessDetailsCardInner.displayName = 'BoundWitnessDetailsCardInner'
