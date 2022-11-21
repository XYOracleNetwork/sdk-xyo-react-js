import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import { Card, Collapse, IconButton } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { XyoPayloadDetailsRenderProps } from '@xyo-network/react-payload-plugin'
import { TableHeightProvider, useTableHeight } from '@xyo-network/react-table'
import { forwardRef, useEffect, useState } from 'react'

import { BoundWitnessPayloadsTable, BoundWitnessPayloadsTableForBWs, BoundWitnessSignatureTable } from '../../_shared'
import { BoundWitnessCardHeader } from '../../Card'
import { BoundWitnessBottomNavigation } from './Navigation'

const BoundWitnessDetailsCard = forwardRef<HTMLDivElement, XyoPayloadDetailsRenderProps>(({ visibleRows, ...props }, ref) => {
  return (
    <TableHeightProvider defaultVisibleRows={visibleRows} additionalRows={1}>
      <BoundWitnessDetailsCardInner ref={ref} {...props} />
    </TableHeightProvider>
  )
})

BoundWitnessDetailsCard.displayName = 'BoundWitnessDetailsCard'

export { BoundWitnessDetailsCard }

const BoundWitnessDetailsCardInner = forwardRef<HTMLDivElement, XyoPayloadDetailsRenderProps>(({ payload, active: activeProp, ...props }, ref) => {
  const boundwitness = payload as XyoBoundWitness
  const { height } = useTableHeight()
  const [activeTab, setActiveTab] = useState(0)
  const [collapsed, setCollapsed] = useState(!activeProp)

  useEffect(() => {
    setCollapsed(!activeProp)
  }, [activeProp])

  return (
    <Card ref={ref} {...props}>
      <BoundWitnessCardHeader
        payload={payload}
        active={activeProp}
        activeBgColor={false}
        additionalActions={
          <IconButton onClick={() => setCollapsed(!collapsed)}>{collapsed ? <ExpandMoreRoundedIcon /> : <ExpandLessRoundedIcon />}</IconButton>
        }
      />
      <FlexCol alignItems="stretch" ref={ref} {...props}>
        <Collapse in={collapsed}>
          <FlexCol alignItems="stretch" justifyContent="start" height={height !== undefined ? height : 'auto'} overflow="scroll">
            {activeTab === 0 ? <BoundWitnessPayloadsTable boundwitness={boundwitness} variant="scrollable" /> : null}
            {activeTab === 1 ? <BoundWitnessPayloadsTableForBWs boundwitness={boundwitness} variant="scrollable" /> : null}
            {activeTab === 2 ? <BoundWitnessSignatureTable block={boundwitness} variant="scrollable" /> : null}
          </FlexCol>
        </Collapse>
        <BoundWitnessBottomNavigation
          onClick={() => setCollapsed(true)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          boundWitness={boundwitness}
        />
      </FlexCol>
    </Card>
  )
})

BoundWitnessDetailsCardInner.displayName = 'BoundWitnessDetailsCardInner'
