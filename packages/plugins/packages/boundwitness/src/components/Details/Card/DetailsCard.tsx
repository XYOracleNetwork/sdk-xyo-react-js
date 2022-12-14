import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import { Card, CardProps, Collapse, Divider, IconButton } from '@mui/material'
import { FlexGrowCol, FlexRow } from '@xylabs/react-flexbox'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { XyoPayloadDetailsRenderProps } from '@xyo-network/react-payload-plugin'
import { TableHeightProvider, useTableHeight } from '@xyo-network/react-table'
import { forwardRef, useEffect, useState } from 'react'

import { BoundWitnessPayloadsTable, BoundWitnessPayloadsTableForBWs, BoundWitnessSignatureTable } from '../../_shared'
import { BoundWitnessCardHeader } from '../../Card'
import { BoundWitnessBottomNavigation, BWNavigationTabs } from './Navigation'

const BoundWitnessDetailsCard = forwardRef<HTMLDivElement, XyoPayloadDetailsRenderProps & CardProps>(({ visibleRows, ...props }, ref) => {
  return (
    <TableHeightProvider defaultVisibleRows={visibleRows} additionalRows={1}>
      <BoundWitnessDetailsCardInner ref={ref} {...props} />
    </TableHeightProvider>
  )
})

BoundWitnessDetailsCard.displayName = 'BoundWitnessDetailsCard'

export { BoundWitnessDetailsCard }

const BoundWitnessDetailsCardInner = forwardRef<HTMLDivElement, XyoPayloadDetailsRenderProps & CardProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ payload, active: activeProp, listMode, visibleRows, ...props }, ref) => {
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
          hideJSONButton={false}
          hideValidation={false}
          hidePreviousHash={false}
          additionalActions={
            <>
              <Divider flexItem orientation={'vertical'} sx={{ ml: 2, mr: 1 }} />
              <IconButton onClick={() => setCollapsed(!collapsed)}>{collapsed ? <ExpandMoreRoundedIcon /> : <ExpandLessRoundedIcon />}</IconButton>
            </>
          }
          sx={{ columnGap: 2 }}
        />
        <Collapse in={collapsed}>
          <FlexRow alignItems="stretch" height={height !== undefined && !collapsed ? height : 'auto'} ref={ref} {...props}>
            <BWNavigationTabs value={activeTab} setValue={setActiveTab} boundWitness={boundwitness} />
            <FlexGrowCol justifyContent="start" overflow="scroll" sx={{ borderLeft: '1px solid', borderLeftColor: 'divider' }}>
              {activeTab === 0 ? <BoundWitnessPayloadsTable boundwitness={boundwitness} variant="scrollable" /> : null}
              {activeTab === 1 ? <BoundWitnessPayloadsTableForBWs boundwitness={boundwitness} variant="scrollable" /> : null}
              {activeTab === 2 ? <BoundWitnessSignatureTable block={boundwitness} variant="scrollable" /> : null}
            </FlexGrowCol>
          </FlexRow>
        </Collapse>
        <Collapse in={!collapsed} unmountOnExit>
          <BoundWitnessBottomNavigation
            onClick={() => setCollapsed(true)}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            boundWitness={boundwitness}
          />
        </Collapse>
      </Card>
    )
  },
)

BoundWitnessDetailsCardInner.displayName = 'BoundWitnessDetailsCardInner'
