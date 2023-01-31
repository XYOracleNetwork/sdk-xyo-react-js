import { AvatarProps, CardHeader, CardHeaderProps, Typography } from '@mui/material'
import { ReactNode } from 'react'

import { XyoThemeTokenAvatar } from '../XyoThemeTokenAvatar'

export interface TokenSummaryProps extends CardHeaderProps {
  icon?: string
  imgBgProps?: AvatarProps
  symbol?: string
  symbolElement?: ReactNode
}

export const TokenSummary: React.FC<TokenSummaryProps> = ({ icon, symbol, symbolElement, children, ...props }) => {
  return (
    <>
      <CardHeader
        avatar={<XyoThemeTokenAvatar src={icon} alt={symbol} />}
        title={
          <Typography variant="h6" fontWeight={300} textTransform="uppercase">
            {symbolElement ?? symbol}
          </Typography>
        }
        {...props}
      />
      {children}
    </>
  )
}
