import { Toolbar, ToolbarProps, Typography, useTheme } from '@mui/material'
import { FlexRow, LinkEx } from '@xylabs/sdk-react'
import { To } from 'react-router-dom'

import { XyoLogo } from './XyoLogo'

export interface ContextToolbarProps extends ToolbarProps {
  to?: To
  version?: boolean
}

export const ContextToolbar: React.FC<ContextToolbarProps> = ({ to = '/', version = false, ...props }) => {
  const theme = useTheme()
  return (
    <Toolbar {...props}>
      <LinkEx to={to}>
        <FlexRow>
          <XyoLogo height="40" width="43" />
          {version ? (
            <Typography
              position="absolute"
              borderRadius={1}
              right={0}
              color={theme.palette.getContrastText(theme.palette.text.primary)}
              bottom={0}
              bgcolor={theme.palette.text.primary}
              paddingX="2px"
              lineHeight={1}
              variant="caption"
              border={`1px ${theme.palette.getContrastText(theme.palette.primary.main)} solid`}
            >
              2.0
            </Typography>
          ) : null}
        </FlexRow>
      </LinkEx>
    </Toolbar>
  )
}
