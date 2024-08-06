import { Collapse } from '@mui/material'
import { FlexGrowCol, FlexRow } from '@xylabs/react-flexbox'
import { BoundWitness } from '@xyo-network/boundwitness-model'
import { CardContentEx, CardContentExProps } from '@xyo-network/react-card'
import { useTableHeight } from '@xyo-network/react-table'
import { Dispatch, forwardRef, SetStateAction, useState } from 'react'

import { BoundWitnessPayloadsTable, BoundWitnessPayloadsTableForBWs, BoundWitnessSignatureTable } from '../../_shared/index.js'
import { BoundWitnessBottomNavigation, BWNavigationTabs } from './Navigation/index.js'

export interface DetailsCardContentProps extends CardContentExProps {
  boundwitness?: BoundWitness
  collapsed?: boolean
  setCollapsed?: Dispatch<SetStateAction<boolean>>
}

export const DetailsCardContent = forwardRef<HTMLDivElement, DetailsCardContentProps>(({ collapsed, boundwitness, setCollapsed, ...props }, ref) => {
  const { height } = useTableHeight()
  const [activeTab, setActiveTab] = useState(0)

  return (
    <CardContentEx removePadding>
      <FlexGrowCol alignItems="stretch" height={height !== undefined && collapsed ? height : 'auto'} justifyContent="start" ref={ref}>
        <Collapse in={collapsed}>
          <FlexRow alignItems="stretch" height={height !== undefined && collapsed ? height : 'auto'} {...props}>
            <BWNavigationTabs value={activeTab} setValue={setActiveTab} boundWitness={boundwitness} />
            <FlexGrowCol justifyContent="start" overflow="scroll" sx={{ borderLeft: '1px solid', borderLeftColor: 'divider' }}>
              {activeTab === 0
                ? <BoundWitnessPayloadsTable boundwitness={boundwitness} variant="scrollable" />
                : null}
              {activeTab === 1
                ? <BoundWitnessPayloadsTableForBWs boundwitness={boundwitness} variant="scrollable" />
                : null}
              {activeTab === 2
                ? <BoundWitnessSignatureTable block={boundwitness} variant="scrollable" />
                : null}
            </FlexGrowCol>
          </FlexRow>
        </Collapse>
      </FlexGrowCol>
      <Collapse in={!collapsed} unmountOnExit>
        <BoundWitnessBottomNavigation
          onClick={() => setCollapsed?.(true)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          boundWitness={boundwitness}
        />
      </Collapse>
    </CardContentEx>
  )
})

DetailsCardContent.displayName = 'DetailsCardContent'
