import { FlexCol } from '@xylabs/react-flexbox'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { XyoPayloadDetailsRenderProps } from '@xyo-network/react-payload-plugin'
import { TableHeightProvider, useTableHeight } from '@xyo-network/react-table'
import { forwardRef, useState } from 'react'

import { BoundWitnessPayloadsTable, BoundWitnessPayloadsTableForBWs, BoundWitnessSignatureTable } from '../../_shared'
import { BoundWitnessBottomNavigation } from './Navigation'

const BoundWitnessDetailsBox = forwardRef<HTMLDivElement, XyoPayloadDetailsRenderProps>(({ visibleRows, ...props }, ref) => {
  return (
    <TableHeightProvider defaultVisibleRows={visibleRows} additionalRows={1}>
      <BoundWitnessDetailsBoxInner ref={ref} {...props} />
    </TableHeightProvider>
  )
})

BoundWitnessDetailsBox.displayName = 'BoundWitnessDetailsBox'

const BoundWitnessDetailsBoxInner = forwardRef<HTMLDivElement, XyoPayloadDetailsRenderProps>(({ payload, ...props }, ref) => {
  const boundwitness = payload as XyoBoundWitness
  const { height } = useTableHeight()
  const [activeTab, setActiveTab] = useState(0)

  return (
    <FlexCol alignItems="stretch" ref={ref} {...props}>
      <FlexCol alignItems="stretch" height={height !== undefined ? height : 'auto'}>
        {activeTab === 0 ? <BoundWitnessPayloadsTable boundwitness={boundwitness} variant="scrollable" /> : null}
        {activeTab === 1 ? <BoundWitnessPayloadsTableForBWs boundwitness={boundwitness} variant="scrollable" /> : null}
        {activeTab === 2 ? <BoundWitnessSignatureTable block={boundwitness} variant="scrollable" /> : null}
      </FlexCol>
      <BoundWitnessBottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} boundWitness={boundwitness} />
    </FlexCol>
  )
})

BoundWitnessDetailsBoxInner.displayName = 'BoundWitnessDetailsBoxInner'

export { BoundWitnessDetailsBox }
