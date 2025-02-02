import type { CollapseProps } from '@mui/material'
import {
  Collapse, styled, useTheme,
} from '@mui/material'
import { useCollapsible } from '@xylabs/react-shared'
import type { PropsWithChildren } from 'react'
import React from 'react'

export const CollapsibleDrawer: React.FC<PropsWithChildren<CollapseProps>> = ({
  children, sx, ...props
}) => {
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
