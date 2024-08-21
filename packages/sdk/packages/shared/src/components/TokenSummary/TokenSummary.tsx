import type { AvatarProps, CardHeaderProps } from '@mui/material'
import { CardHeader, Typography } from '@mui/material'
import type { ReactNode } from 'react'
import React from 'react'

import { ThemeTokenAvatar } from '../ThemeTokenAvatar/index.ts'

export interface TokenSummaryProps extends CardHeaderProps {
  icon?: string
  imgBgProps?: AvatarProps
  symbol?: string
  symbolElement?: ReactNode
}

export const TokenSummary: React.FC<TokenSummaryProps> = ({
  icon, symbol, symbolElement, children, ...props
}) => {
  return (
    <>
      <CardHeader
        avatar={<ThemeTokenAvatar src={icon} alt={symbol} />}
        title={(
          <Typography variant="h6" fontWeight={300} textTransform="uppercase">
            {symbolElement ?? symbol}
          </Typography>
        )}
        {...props}
      />
      {children}
    </>
  )
}
