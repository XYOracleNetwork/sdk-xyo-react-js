import type { CollapseProps } from '@mui/material'
import { Collapse, styled, useTheme } from '@mui/material'
import type { WithChildren } from '@xylabs/react-shared'
import React from 'react'

import { useCollapsible } from '../../contexts/index.ts'

export const CollapsibleDrawer: React.FC<WithChildren<CollapseProps>> = ({ children, sx, ...props }) => {
  const { collapse, setCollapseEnd } = useCollapsible()
  const theme = useTheme()

  const collapsedSize = props.collapsedSize ?? theme.spacing(5)

  return (
    <CollapsibleFlexInner
      in={!collapse}
      orientation="horizontal"
      collapsedSize={collapsedSize}
      onExited={() => setCollapseEnd?.(true)}
      sx={{
        alignItems: 'start',
        display: 'flex',
        height: '100%',
        ...sx,
      }}
      {...props}
    >
      {children}
    </CollapsibleFlexInner>
  )
}

const CollapsibleFlexInner = styled(Collapse)(() => ({
  '& .MuiCollapse-wrapperInner': {
    display: 'flex',
    flexDirection: 'column',
  },
}))
