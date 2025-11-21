import { Collapse } from '@mui/material'
import { FlexGrowCol, FlexRow } from '@xylabs/react-flexbox'
import type { BoundWitness, Signed } from '@xyo-network/boundwitness-model'
import type { CardContentExProps } from '@xyo-network/react-card'
import { CardContentEx } from '@xyo-network/react-card'
import { useTableHeight } from '@xyo-network/react-table'
import type { Dispatch, SetStateAction } from 'react'
import React, { useState } from 'react'

import {
  BoundWitnessPayloadsTable, BoundWitnessPayloadsTableForBWs, BoundWitnessSignatureTable,
} from '../../_shared/index.ts'
import { BoundWitnessBottomNavigation, BWNavigationTabs } from './Navigation/index.ts'

export interface DetailsCardContentProps extends CardContentExProps {
  boundwitness?: Signed<BoundWitness>
  collapsed?: boolean
  setCollapsed?: Dispatch<SetStateAction<boolean>>
}

export const DetailsCardContent = ({
  ref, collapsed, boundwitness, setCollapsed, ...props
}: DetailsCardContentProps & { ref?: React.Ref<HTMLDivElement | null> }) => {
  const { height } = useTableHeight()
  const [activeTab, setActiveTab] = useState(0)

  return (
    <CardContentEx removePadding>
      <FlexGrowCol alignItems="stretch" height={height !== undefined && collapsed ? height : 'auto'} justifyContent="start" ref={ref}>
        <Collapse in={collapsed}>
          <FlexRow alignItems="stretch" height={height !== undefined && collapsed ? height : 'auto'} {...props}>
            <BWNavigationTabs value={activeTab} setValue={setActiveTab} boundWitness={boundwitness} />
            <FlexGrowCol
              justifyContent="start"
              overflow="scroll"
              sx={{ borderLeft: '1px solid', borderLeftColor: 'divider' }}
            >
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
}

DetailsCardContent.displayName = 'DetailsCardContent'
