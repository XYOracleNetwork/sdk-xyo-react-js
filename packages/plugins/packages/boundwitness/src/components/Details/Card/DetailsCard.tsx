import { ExpandLessRounded as ExpandLessRoundedIcon, ExpandMoreRounded as ExpandMoreRoundedIcon } from '@mui/icons-material'
import { Card, CardProps, Divider, IconButton } from '@mui/material'
import { BoundWitness } from '@xyo-network/boundwitness-model'
import { PayloadDetailsRenderProps } from '@xyo-network/react-payload-plugin'
import { TableHeightProvider } from '@xyo-network/react-table'
import { forwardRef, useEffect, useState } from 'react'

import { BoundWitnessCardHeader } from '../../Card/index.js'
import { DetailsCardContent } from './DetailsCardContent.js'

const BoundWitnessDetailsCard = forwardRef<HTMLDivElement, PayloadDetailsRenderProps & CardProps>(({ visibleRows, ...props }, ref) => {
  return (
    <TableHeightProvider defaultVisibleRows={visibleRows} additionalRows={1}>
      <BoundWitnessDetailsCardInner ref={ref} {...props} />
    </TableHeightProvider>
  )
})

BoundWitnessDetailsCard.displayName = 'BoundWitnessDetailsCard'

export { BoundWitnessDetailsCard }

const BoundWitnessDetailsCardInner = forwardRef<HTMLDivElement, PayloadDetailsRenderProps & CardProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ payload, active: activeProp, listMode, visibleRows, ...props }, ref) => {
    const boundwitness = payload as BoundWitness
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
          additionalActions={(
            <>
              <Divider flexItem orientation="vertical" sx={{ ml: 2, mr: 1 }} />
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
