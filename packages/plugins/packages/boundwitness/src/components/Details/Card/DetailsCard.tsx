import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import { Card, CardProps, Divider, IconButton } from '@mui/material'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { XyoPayloadDetailsRenderProps } from '@xyo-network/react-payload-plugin'
import { TableHeightProvider } from '@xyo-network/react-table'
import { forwardRef, useEffect, useState } from 'react'

import { BoundWitnessCardHeader } from '../../Card'
import { DetailsCardContent } from './DetailsCardContent'

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
        <DetailsCardContent boundwitness={boundwitness} collapsed={collapsed} setCollapsed={setCollapsed} ref={ref} />
      </Card>
    )
  },
)

BoundWitnessDetailsCardInner.displayName = 'BoundWitnessDetailsCardInner'
