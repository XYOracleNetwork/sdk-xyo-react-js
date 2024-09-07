import { ExpandLessRounded as ExpandLessRoundedIcon, ExpandMoreRounded as ExpandMoreRoundedIcon } from '@mui/icons-material'
import type { CardProps } from '@mui/material'
import {
  Card, Divider, IconButton,
} from '@mui/material'
import type { BoundWitness } from '@xyo-network/boundwitness-model'
import type { PayloadDetailsRenderProps } from '@xyo-network/react-payload-plugin'
import React, { forwardRef } from 'react'

import { BoundWitnessCardHeader } from '../../Card/index.ts'
import { DetailsCardContent } from './DetailsCardContent.tsx'
import { useResetState } from './useResetState.js'

const BoundWitnessDetailsCardInner = forwardRef<HTMLDivElement, PayloadDetailsRenderProps & CardProps>(

  ({
    payload, active, ...props
  }, ref) => {
    const boundwitness = payload as BoundWitness
    const [collapsed, setCollapsed] = useResetState<boolean>(!active)

    return (
      <Card ref={ref} {...props}>
        <BoundWitnessCardHeader
          payload={payload}
          active={active}
          activeBgColor={false}
          hideJSONButton={false}
          hideValidation={false}
          hidePreviousHash={false}
          additionalActions={(
            <>
              <Divider
                flexItem
                orientation="vertical"
                sx={{ ml: 2, mr: 1 }}
              />
              <IconButton onClick={() => setCollapsed(!collapsed)}>
                {collapsed
                  ? <ExpandMoreRoundedIcon />
                  : <ExpandLessRoundedIcon />}
              </IconButton>
            </>
          )}
          sx={{ columnGap: 2 }}
        />
        <DetailsCardContent boundwitness={boundwitness} collapsed={collapsed} setCollapsed={setCollapsed} ref={ref} />
      </Card>
    )
  },
)

BoundWitnessDetailsCardInner.displayName = 'BoundWitnessDetailsCardInner'

export { BoundWitnessDetailsCardInner }
