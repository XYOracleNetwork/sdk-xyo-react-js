import { Collapse, CollapseProps, styled, useTheme } from '@mui/material'
import { WithChildren } from '@xylabs/react-shared'

import { useCollapsible } from '../../contexts/index.js'

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
