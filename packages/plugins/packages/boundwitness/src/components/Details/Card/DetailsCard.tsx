import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import { Card, CardProps, Collapse, Divider, IconButton } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { XyoPayloadDetailsRenderProps } from '@xyo-network/react-payload-plugin'
import { TableHeightProvider, useTableHeight } from '@xyo-network/react-table'
import { forwardRef, useEffect, useState } from 'react'

import { BoundWitnessPayloadsTable, BoundWitnessPayloadsTableForBWs, BoundWitnessSignatureTable } from '../../_shared'
import { BoundWitnessCardHeader } from '../../Card'
import { BoundWitnessBottomNavigation } from './Navigation'

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
  },
)

BoundWitnessDetailsCardInner.displayName = 'BoundWitnessDetailsCardInner'
