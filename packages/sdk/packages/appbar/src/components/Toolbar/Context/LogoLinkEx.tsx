import { Typography, useTheme } from '@mui/material'
import { assertEx } from '@xylabs/assert'
import { FlexRow } from '@xylabs/react-flexbox'
import type { LinkExProps } from '@xylabs/react-link'
import { LinkEx } from '@xylabs/react-link'
import React from 'react'

import { Logo } from './Logo.tsx'

export type LogoLinkExProps = LinkExProps & {
  logo?: React.ReactNode
  version?: boolean | string
}

export const LogoLinkEx: React.FC<LogoLinkExProps> = ({
  logo, to = '/', href, version = false, ...props
}) => {
  const theme = useTheme()
  assertEx(href === undefined, () => 'href is not supported')
  return (
    <LinkEx to={to} sx={{ 'opacity': 0.8, '&:hover': { opacity: 1 } }} {...props}>
      <FlexRow paddingX="4px">
        {logo ?? <Logo height="40" width="43" />}
        {version === undefined
          ? null
          : (
              <Typography
                position="absolute"
                borderRadius={1}
                right={6}
                color={theme.vars.palette.primary.main}
                bottom={0}
                bgcolor={theme.vars.palette.primary.contrastText}
                paddingX="2px"
                lineHeight={1}
                variant="caption"
                border={`1px ${theme.vars.palette.primary.main} solid`}
              >
                {typeof version === 'string' ? version : '2.1'}
              </Typography>
            )}
      </FlexRow>
    </LinkEx>
  )
}
